/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Add Missing Indexes for Foreign Keys**
     - Add index on `admin_users.created_by`
     - Add index on `contact_messages.read_by`
     - Add index on `projects.created_by`
     - Add index on `projects.updated_by`

  2. **Optimize RLS Policies - Use SELECT for auth functions**
     - Update all policies to use `(SELECT auth.uid())` instead of `auth.uid()`
     - This prevents re-evaluation for each row, dramatically improving performance

  3. **Fix Function Search Path Issues**
     - Add explicit search_path to all security definer functions
     - Prevents potential security vulnerabilities from schema manipulation

  4. **Consolidate Multiple Permissive Policies**
     - Combine overlapping SELECT policies into single policies
     - Reduces policy evaluation overhead

  5. **Remove Anonymous Access Where Inappropriate**
     - Restrict anon access to only truly public data

  ## Security Notes
  - All changes maintain or improve existing security posture
  - Performance improvements do not compromise data integrity
  - Foreign key indexes improve query performance significantly
*/

-- Add missing indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_admin_users_created_by ON admin_users(created_by);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read_by ON contact_messages(read_by);
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_updated_by ON projects(updated_by);

-- Drop all existing RLS policies first before updating functions
DROP POLICY IF EXISTS "Super admins can view all users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view non-super-admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view own profile" ON admin_users;
DROP POLICY IF EXISTS "Super admins can create users" ON admin_users;
DROP POLICY IF EXISTS "Admins can create non-super-admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can update all users" ON admin_users;
DROP POLICY IF EXISTS "Admins can update non-super-admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can update own profile" ON admin_users;
DROP POLICY IF EXISTS "Super admins can delete users" ON admin_users;

DROP POLICY IF EXISTS "Super admins can view all permissions" ON user_permissions;
DROP POLICY IF EXISTS "Admins can view non-super-admin permissions" ON user_permissions;
DROP POLICY IF EXISTS "Users can view own permissions" ON user_permissions;
DROP POLICY IF EXISTS "Super admins can insert permissions" ON user_permissions;
DROP POLICY IF EXISTS "Admins can insert non-super-admin permissions" ON user_permissions;
DROP POLICY IF EXISTS "Super admins can update permissions" ON user_permissions;
DROP POLICY IF EXISTS "Admins can update non-super-admin permissions" ON user_permissions;
DROP POLICY IF EXISTS "Super admins can delete permissions" ON user_permissions;
DROP POLICY IF EXISTS "Admins can delete non-super-admin permissions" ON user_permissions;

DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Anyone can view published projects" ON projects;
DROP POLICY IF EXISTS "Admin users can create projects" ON projects;
DROP POLICY IF EXISTS "Admin users can update projects" ON projects;
DROP POLICY IF EXISTS "Admin users can delete projects" ON projects;

DROP POLICY IF EXISTS "Admin users can view messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin users can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin users can delete messages" ON contact_messages;

-- Now update functions with secure search_path
DROP FUNCTION IF EXISTS is_admin(uuid) CASCADE;
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP FUNCTION IF EXISTS is_super_admin(uuid) CASCADE;
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP FUNCTION IF EXISTS get_current_admin_user() CASCADE;
CREATE OR REPLACE FUNCTION get_current_admin_user()
RETURNS uuid AS $$
BEGIN
  RETURN (
    SELECT id FROM admin_users
    WHERE auth_user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP FUNCTION IF EXISTS has_permission(uuid, text, text) CASCADE;
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
  SELECT role INTO user_role
  FROM admin_users
  WHERE auth_user_id = user_uuid AND is_active = true;

  IF user_role = 'super_admin' THEN
    RETURN true;
  END IF;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Consolidated optimized policies for admin_users with (SELECT auth.uid())
CREATE POLICY "Authenticated users can view their profile or admin viewable users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    auth_user_id = (SELECT auth.uid()) OR
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND role != 'super_admin')
  );

CREATE POLICY "Admins and super admins can create users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND role != 'super_admin')
  );

CREATE POLICY "Users can update their own or admin managed profiles"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    auth_user_id = (SELECT auth.uid()) OR
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND role != 'super_admin')
  )
  WITH CHECK (
    (auth_user_id = (SELECT auth.uid()) AND role = (SELECT role FROM admin_users WHERE auth_user_id = (SELECT auth.uid()))) OR
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND role != 'super_admin')
  );

CREATE POLICY "Super admins can delete non-self users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (is_super_admin((SELECT auth.uid())) AND auth_user_id != (SELECT auth.uid()));

-- Consolidated optimized policies for user_permissions with (SELECT auth.uid())
CREATE POLICY "Users can view their own or admin managed permissions"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (
    user_id = get_current_admin_user() OR
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND user_id IN (SELECT id FROM admin_users WHERE role != 'super_admin'))
  );

CREATE POLICY "Admins and super admins can insert permissions"
  ON user_permissions FOR INSERT
  TO authenticated
  WITH CHECK (
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND user_id IN (SELECT id FROM admin_users WHERE role != 'super_admin'))
  );

CREATE POLICY "Admins and super admins can update permissions"
  ON user_permissions FOR UPDATE
  TO authenticated
  USING (
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND user_id IN (SELECT id FROM admin_users WHERE role != 'super_admin'))
  )
  WITH CHECK (
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND user_id IN (SELECT id FROM admin_users WHERE role != 'super_admin'))
  );

CREATE POLICY "Admins and super admins can delete permissions"
  ON user_permissions FOR DELETE
  TO authenticated
  USING (
    is_super_admin((SELECT auth.uid())) OR
    (is_admin((SELECT auth.uid())) AND user_id IN (SELECT id FROM admin_users WHERE role != 'super_admin'))
  );

-- Consolidated optimized policies for projects (restrict anon to only published)
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  TO authenticated, anon
  USING (status = 'published' OR has_permission((SELECT auth.uid()), 'projects', 'view'));

CREATE POLICY "Authorized users can manage projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (has_permission((SELECT auth.uid()), 'projects', 'create'));

CREATE POLICY "Authorized users can edit projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (has_permission((SELECT auth.uid()), 'projects', 'edit'))
  WITH CHECK (has_permission((SELECT auth.uid()), 'projects', 'edit'));

CREATE POLICY "Authorized users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (has_permission((SELECT auth.uid()), 'projects', 'delete'));

-- Consolidated optimized policies for contact_messages
CREATE POLICY "Authorized users can view messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (has_permission((SELECT auth.uid()), 'messages', 'view'));

CREATE POLICY "Authorized users can update messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (has_permission((SELECT auth.uid()), 'messages', 'edit'))
  WITH CHECK (has_permission((SELECT auth.uid()), 'messages', 'edit'));

CREATE POLICY "Authorized users can delete messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (has_permission((SELECT auth.uid()), 'messages', 'delete'));
