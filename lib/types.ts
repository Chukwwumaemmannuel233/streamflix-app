export interface VideoType {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: string
  year: number
  rating: string
  views: number
  categories: string[]
  access?: "standard" | "premium"
  creator: {
    name: string
    avatar: string
    subscribers: number
  }
  studio?: {
    name: string
    logo: string
    verified: boolean
    type: string
    subscribers?: number
  }
}

export interface CategoryType {
  id: string
  name: string
}

export interface CommentType {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  likes: number
  timestamp: string
}

export interface StudioType {
  id: string
  name: string
  username: string
  logo: string
  banner: string
  description: string
  verified: boolean
  subscribers: number
  totalViews: number
  contentCount: number
  joinedDate: string
  type: string
  country: string
  website?: string
}

export interface UserType {
  id: string
  name: string
  email: string
  avatar: string
  type: "viewer" | "studio"
  subscription?: {
    plan: string
    status: string
    expiresAt: string
  }
  studio?: StudioType
}
