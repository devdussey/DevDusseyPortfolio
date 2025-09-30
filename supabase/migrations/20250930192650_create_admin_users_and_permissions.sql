/*
  # Admin Users and Permissions System

  ## Overview
  Creates a comprehensive role-based access control system for the admin panel.

  ## New Tables

  ### `admin_users`
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User's email address
  - `full_name` (text) - User's full name
  - `role` (text) - User role: 'super_admin', 'admin', 'editor', 'viewer'
  - `is_active` (boolean) - Whether the user account is active
  - `created_at` (timestamptz) - When user was added
  - `created_by` (uuid) - Who created this user
  - `last_login` (timestamptz) - Last login timestamp

  ### `user_permissions`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References admin_users
  - `resource` (text) - Resource type: 'projects', 'current_projects', 'messages', 'users', 'settings'
  - `can_view` (boolean) - Permission to view
  - `can_create` (boolean) - Permission to create
  - `can_edit` (boolean) - Permission to edit
  - `can_delete` (boolean) - Permission to delete
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Super admins have full access
  - Admins can manage users and content
  - Editors can manage content only
  - Viewers can only view content
  - Users can only access based on their permissions

  ## Notes
  - First user must be created manually and set as super_admin
  - Permissions are checked at row level
  - Inactive users cannot access the system
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_users(id),
  last_login timestamptz,
  UNIQUE(auth_user_id)
);

-- Create user_permissions table
CREATE TABLE IF NOT EXISTS user_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES admin_users(id) ON DELETE CASCADE NOT NULL,
  resource text NOT NULL CHECK (resource IN ('projects', 'current_projects', 'messages', 'users', 'settings')),
  can_view boolean DEFAULT false,
  can_create boolean DEFAULT false,
  can_edit boolean DEFAULT false,
  can_delete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, resource)
);

-- Create index for faster permission lookups
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_resource ON user_permissions(resource);
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_user_id ON admin_users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE auth_user_id = user_uuid
    AND is_active = true
    AND role IN ('super_admin', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE auth_user_id = user_uuid
    AND is_active = true
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current admin user
CREATE OR REPLACE FUNCTION get_current_admin_user()
RETURNS uuid AS $$
BEGIN
  RETURN (
    SELECT id FROM admin_users
    WHERE auth_user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check user permission
CREATE OR REPLACE FUNCTION has_permission(
  user_uuid uuid,
  resource_name text,
  permission_type text
)
RETURNS boolean AS $$
DECLARE
  user_role text;
  has_perm boolean;
BEGIN
  -- Get user role
  SELECT role INTO user_role
  FROM admin_users
  WHERE auth_user_id = user_uuid AND is_active = true;

  -- Super admins have all permissions
  IF user_role = 'super_admin' THEN
    RETURN true;
  END IF;

  -- Check specific permission
  IF permission_type = 'view' THEN
    SELECT can_view INTO has_perm
    FROM user_permissions
    WHERE user_id = (SELECT id FROM admin_users WHERE auth_user_id = user_uuid)
    AND resource = resource_name;
  ELSIF permission_type = 'create' THEN
    SELECT can_create INTO has_perm
    FROM user_permissions
    WHERE user_id = (SELECT id FROM admin_users WHERE auth_user_id = user_uuid)
    AND resource = resource_name;
  ELSIF permission_type = 'edit' THEN
    SELECT can_edit INTO has_perm
    FROM user_permissions
    WHERE user_id = (SELECT id FROM admin_users WHERE auth_user_id = user_uuid)
    AND resource = resource_name;
  ELSIF permission_type = 'delete' THEN
    SELECT can_delete INTO has_perm
    FROM user_permissions
    WHERE user_id = (SELECT id FROM admin_users WHERE auth_user_id = user_uuid)
    AND resource = resource_name;
  END IF;

  RETURN COALESCE(has_perm, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for admin_users

-- Super admins can view all users
CREATE POLICY "Super admins can view all users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (is_super_admin(auth.uid()));

-- Admins can view all users except super admins
CREATE POLICY "Admins can view non-super-admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    is_admin(auth.uid()) AND 
    (role != 'super_admin' OR auth_user_id = auth.uid())
  );

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

-- Super admins can insert users
CREATE POLICY "Super admins can create users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (is_super_admin(auth.uid()));

-- Admins can insert non-super-admin users
CREATE POLICY "Admins can create non-super-admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin(auth.uid()) AND 
    role != 'super_admin'
  );

-- Super admins can update all users
CREATE POLICY "Super admins can update all users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (is_super_admin(auth.uid()))
  WITH CHECK (is_super_admin(auth.uid()));

-- Admins can update non-super-admin users
CREATE POLICY "Admins can update non-super-admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    is_admin(auth.uid()) AND 
    role != 'super_admin'
  )
  WITH CHECK (
    is_admin(auth.uid()) AND 
    role != 'super_admin'
  );

-- Users can update their own profile (limited fields)
CREATE POLICY "Users can update own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid())
  WITH CHECK (
    auth_user_id = auth.uid() AND
    role = (SELECT role FROM admin_users WHERE auth_user_id = auth.uid())
  );

-- Super admins can delete users
CREATE POLICY "Super admins can delete users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (is_super_admin(auth.uid()) AND auth_user_id != auth.uid());

-- RLS Policies for user_permissions

-- Super admins can view all permissions
CREATE POLICY "Super admins can view all permissions"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (is_super_admin(auth.uid()));

-- Admins can view permissions for non-super-admins
CREATE POLICY "Admins can view non-super-admin permissions"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (
    is_admin(auth.uid()) AND
    user_id IN (
      SELECT id FROM admin_users 
      WHERE role != 'super_admin'
    )
  );

-- Users can view their own permissions
CREATE POLICY "Users can view own permissions"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (user_id = get_current_admin_user());

-- Super admins can manage all permissions
CREATE POLICY "Super admins can insert permissions"
  ON user_permissions FOR INSERT
  TO authenticated
  WITH CHECK (is_super_admin(auth.uid()));

CREATE POLICY "Super admins can update permissions"
  ON user_permissions FOR UPDATE
  TO authenticated
  USING (is_super_admin(auth.uid()))
  WITH CHECK (is_super_admin(auth.uid()));

CREATE POLICY "Super admins can delete permissions"
  ON user_permissions FOR DELETE
  TO authenticated
  USING (is_super_admin(auth.uid()));

-- Admins can manage permissions for non-super-admins
CREATE POLICY "Admins can insert non-super-admin permissions"
  ON user_permissions FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin(auth.uid()) AND
    user_id IN (
      SELECT id FROM admin_users 
      WHERE role != 'super_admin'
    )
  );

CREATE POLICY "Admins can update non-super-admin permissions"
  ON user_permissions FOR UPDATE
  TO authenticated
  USING (
    is_admin(auth.uid()) AND
    user_id IN (
      SELECT id FROM admin_users 
      WHERE role != 'super_admin'
    )
  )
  WITH CHECK (
    is_admin(auth.uid()) AND
    user_id IN (
      SELECT id FROM admin_users 
      WHERE role != 'super_admin'
    )
  );

CREATE POLICY "Admins can delete non-super-admin permissions"
  ON user_permissions FOR DELETE
  TO authenticated
  USING (
    is_admin(auth.uid()) AND
    user_id IN (
      SELECT id FROM admin_users 
      WHERE role != 'super_admin'
    )
  );

-- Update existing projects table to add created_by and updated_by
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE projects ADD COLUMN created_by uuid REFERENCES admin_users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'updated_by'
  ) THEN
    ALTER TABLE projects ADD COLUMN updated_by uuid REFERENCES admin_users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE projects ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Update contact_messages table to add status tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_messages' AND column_name = 'status'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_messages' AND column_name = 'read_by'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN read_by uuid REFERENCES admin_users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_messages' AND column_name = 'read_at'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN read_at timestamptz;
  END IF;
END $$;

-- Update RLS policies for projects to check permissions
DROP POLICY IF EXISTS "Anyone can view published projects" ON projects;
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  TO authenticated, anon
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create projects" ON projects;
CREATE POLICY "Admin users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (has_permission(auth.uid(), 'projects', 'create'));

DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
CREATE POLICY "Admin users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (has_permission(auth.uid(), 'projects', 'edit'))
  WITH CHECK (has_permission(auth.uid(), 'projects', 'edit'));

DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
CREATE POLICY "Admin users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (has_permission(auth.uid(), 'projects', 'delete'));

-- Update RLS policies for contact_messages
DROP POLICY IF EXISTS "Authenticated users can view messages" ON contact_messages;
CREATE POLICY "Admin users can view messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (has_permission(auth.uid(), 'messages', 'view'));

DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
CREATE POLICY "Admin users can update messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (has_permission(auth.uid(), 'messages', 'edit'))
  WITH CHECK (has_permission(auth.uid(), 'messages', 'edit'));

DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;
CREATE POLICY "Admin users can delete messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (has_permission(auth.uid(), 'messages', 'delete'));