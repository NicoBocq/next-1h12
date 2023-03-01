import {FC, HTMLAttributes, PropsWithChildren} from 'react'

import Container from '@/components/Container'

export type SimpleLayoutProps = {
  title?: string
  intro?: string
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>

const SimpleLayout: FC<SimpleLayoutProps> = ({title, intro, children}) => {
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
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  )
}

export default SimpleLayout
