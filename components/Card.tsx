import React, {ElementType, ReactNode} from 'react'

import {ChevronRightIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'

export type CardProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

// type AsProp<C extends React.ElementType> = {
//   as?: C
// }

// type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

// type PolymorphicComponentProp<
//   C extends React.ElementType,
//   Props = {}
// > = React.PropsWithChildren<Props & AsProp<C>> &
//   Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymporphicProps = {
  [K in keyof JSX.IntrinsicElements]: {as: K} & JSX.IntrinsicElements[K]
}[keyof JSX.IntrinsicElements]

export const Card = ({
  as: Component = 'div',
  className,
  children,
}: PolymporphicProps): JSX.Element => {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

export type CardLinkProps = {
  href: string
  children: ReactNode
}

const CardLink = ({children, ...props}: CardLinkProps): JSX.Element => {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

export type CardTitleProps = {
  as?: ElementType
  href?: string
  children: ReactNode
}

const CardTitle = ({
  as: Component = 'h2',
  href,
  children,
}: CardTitleProps): JSX.Element => {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

export type CardDescriptionProps = {
  children: ReactNode
}

const CardDescription = ({children}: CardDescriptionProps): JSX.Element => {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

export type CardCtaProps = {
  children: ReactNode
}

const CardCta = ({children}: CardCtaProps): JSX.Element => {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

export type CardEyebrowProps = {
  as?: ElementType
  decorate?: boolean
} & PolymporphicProps

const CardEyebrow = ({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps): JSX.Element => {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow
