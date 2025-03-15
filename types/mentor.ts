export interface MentorProfile {
  id: string
  userId: string
  name: string
  title: string
  image?: string
  about: string
  specialties: string[]
  experience: {
    company: string
    role: string
    period: string
  }[]
  education: {
    institution: string
    degree: string
    year: string
  }[]
  pricing: {
    chat: number
    video: number
    call: number
  }
  availability: {
    day: string
    slots: string[]
  }[]
  rating: number
  reviewCount: number
}

export interface MentorFilters {
  specialties?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  search?: string
}

