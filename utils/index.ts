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

export const transitionItemVariants = {
  hidden: {opacity: 0, x: -100},
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {delay: custom},
  }),
}
