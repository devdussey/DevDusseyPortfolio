export interface Project {
  id: string
  title: string
  description: string
  image_url?: string
  technologies: string[]
  github_url?: string
  live_url?: string
  status: 'completed' | 'in-progress'
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}
