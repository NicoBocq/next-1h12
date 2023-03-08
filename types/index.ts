export type Project = Database['public']['Tables']['project']['Row']
export type Work = Database['public']['Tables']['work']['Row']
export type Stack = Database['public']['Tables']['stack']['Row']
export type Nav = Database['public']['Tables']['page']['Row']

export type NavProps = {
  nav: Nav[]
}

export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json}
  | Json[]

export interface Database {
  public: {
    Tables: {
      page: {
        Row: {
          created_at: string | null
          description: string
          id: number
          label: string
          path: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          label?: string
          path?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          label?: string
          path?: string
          slug?: string
          title?: string
        }
      }
      project: {
        Row: {
          cover: string | null
          created_at: string | null
          description: string | null
          git_url: string | null
          id: number
          release: string
          slug: string
          title: string | null
          url: string | null
          stack: Stack[]
        }
        Insert: {
          cover?: string | null
          created_at?: string | null
          description?: string | null
          git_url?: string | null
          id?: number
          release?: string
          slug: string
          title?: string | null
          url?: string | null
        }
        Update: {
          cover?: string | null
          created_at?: string | null
          description?: string | null
          git_url?: string | null
          id?: number
          release?: string
          slug?: string
          title?: string | null
          url?: string | null
        }
      }
      projects_stacks: {
        Row: {
          project_id: number
          stack_id: number
        }
        Insert: {
          project_id: number
          stack_id: number
        }
        Update: {
          project_id?: number
          stack_id?: number
        }
      }
      stack: {
        Row: {
          id: number
          name: string
          weight: number
        }
        Insert: {
          id?: number
          name?: string
          weight?: number
        }
        Update: {
          id?: number
          name?: string
          weight?: number
        }
      }
      work: {
        Row: {
          company: string
          description: string | null
          end: string | null
          id: number
          order: number
          start: string | null
          title: string
          stack: Stack[]
        }
        Insert: {
          company: string
          description?: string | null
          end?: string | null
          id?: number
          order?: number
          start?: string | null
          title: string
        }
        Update: {
          company?: string
          description?: string | null
          end?: string | null
          id?: number
          order?: number
          start?: string | null
          title?: string
        }
      }
      works_stacks: {
        Row: {
          stack_id: number
          work_id: number
        }
        Insert: {
          stack_id: number
          work_id: number
        }
        Update: {
          stack_id?: number
          work_id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
