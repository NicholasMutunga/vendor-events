export const SERVICE_CATEGORIES = [
  'Catering',
  'Photography',
  'Entertainment',
  'Decoration',
  'Venue',
  'Planning',
  'Transport',
  'Security',
] as const

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]
