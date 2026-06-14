export interface Channel {
  id: string
  name: string
  categoryId: string
}

export interface Category {
  id: string
  name: string
}

export interface Server {
  id: string
  name: string
  emoji: string
  defaultChannel: string
  categories: Category[]
  channels: Channel[]
}

