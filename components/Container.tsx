import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const OuterContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function OuterContainer(
  { className, children, ...props },
  ref
): JSX.Element {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function InnerContainer(
  { className, children, ...props },
  ref
): JSX.Element {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  Outer?: typeof OuterContainer
  Inner?: typeof InnerContainer
}

export type ContainerWithoutRefProps = Omit<ContainerProps, 'ref'>

const ContainerWithoutRef = (props: ContainerWithoutRefProps, ref: React.Ref<HTMLDivElement>): JSX.Element => {
  const { children, ...restProps } = props
  return (
    <OuterContainer ref={ref} {...restProps}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
}

export const Container = forwardRef(ContainerWithoutRef)

Container.Outer = OuterContainer
Container.Inner = InnerContainer
