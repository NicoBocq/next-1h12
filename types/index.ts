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
          description: string | null
          id: number
          slug: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          slug?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          slug?: string | null
          title?: string | null
        }
      }
      project: {
        Row: {
          cover: string | null
          created_at: string | null
          description: string | null
          git_url: string | null
          id: number
          slug: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          cover?: string | null
          created_at?: string | null
          description?: string | null
          git_url?: string | null
          id?: number
          slug?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          cover?: string | null
          created_at?: string | null
          description?: string | null
          git_url?: string | null
          id?: number
          slug?: string | null
          title?: string | null
          url?: string | null
        }
      }
      project_stacks: {
        Row: {
          element_id: number
          id: number
          stack_id: number
        }
        Insert: {
          element_id: number
          id?: number
          stack_id: number
        }
        Update: {
          element_id?: number
          id?: number
          stack_id?: number
        }
      }
      stack: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      work: {
        Row: {
          company: string | null
          description: string | null
          id: number
          period: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          description?: string | null
          id?: number
          period?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          description?: string | null
          id?: number
          period?: string | null
          title?: string | null
        }
      }
      work_stacks: {
        Row: {
          id: number
          stack_id: number
          work_id: number
        }
        Insert: {
          id?: number
          stack_id: number
          work_id: number
        }
        Update: {
          id?: number
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
