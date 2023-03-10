import {HTMLAttributes, PropsWithChildren, ReactNode} from 'react'

import Container from '@/components/Container'

export type SimpleLayoutProps = {
  title?: string
  intro?: string
  filters?: ReactNode
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>

function SimpleLayout({title, intro, children, filters}: SimpleLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        {title && (
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
        )}
        {intro && (
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {intro}
          </p>
        )}
      </header>
      {filters && <div className="mt-16 sm:mt-20">{filters}</div>}
      <div className="mt-4 min-h-[50vw] sm:mt-8">{children}</div>
    </Container>
  )
}

export default SimpleLayout
