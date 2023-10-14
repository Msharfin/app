export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          content: string | null
          id: number
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
