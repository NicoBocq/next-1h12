export const formatDate = (dateString: string) => {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export const NAVLINKS = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Experience',
    href: '/experience',
  },
  {
    name: 'Sideprojects',
    href: '/sideprojects',
  },
]
