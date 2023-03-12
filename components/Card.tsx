import React, {ElementType, FC, PropsWithChildren, ReactNode} from 'react'

import {ChevronRightIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link, {LinkProps} from 'next/link'

export type CardProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
}

function Card<T extends ElementType = 'div'>({
  as,
  className,
  children,
}: CardProps<T>) {
  const Component = as || 'div'
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

function CardLink({children, ...props}: LinkProps & PropsWithChildren) {
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

export type CardTitleProps<T extends ElementType> = {
  as?: T
  href?: string
  children: ReactNode
}

function CardTitle<T extends ElementType = 'h2'>({
  as,
  href,
  children,
}: CardTitleProps<T>) {
  const Component = as || 'h2'
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

function CardDescription({
  children,
  className,
}: PropsWithChildren & {className?: string}) {
  return (
    <p
      className={clsx(
        'relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400',
        className
      )}
    >
      {children}
    </p>
  )
}
function CardCta({children}: PropsWithChildren) {
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

export type CardEyebrowProps<T extends ElementType> = {
  as?: T
  decorate?: boolean
  children: ReactNode
  className?: string
}

function CardEyebrow<T extends ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps<T>) {
  const Component = as || 'p'
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

export default Card
