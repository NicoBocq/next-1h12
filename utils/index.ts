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
    name: 'Projects',
    href: '/projects',
  },
]

export const transitionItemVariants = {
  hidden: {opacity: 0},
  visible: (custom: number) => ({
    opacity: 1,
    transition: {delay: custom},
  }),
}

export function transitionTiming(index: number) {
  return (index + 1) * 0.2
}
