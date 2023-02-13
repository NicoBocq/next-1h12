import React, {forwardRef} from 'react'
import {ForwardRefExoticComponent, HTMLAttributes} from 'react'

import clsx from 'clsx'

const OuterContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function OuterContainer({className, children, ...props}, ref): JSX.Element {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function InnerContainer({className, children, ...props}, ref): JSX.Element {
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

export type ContainerComponentType = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement>
> & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Container({children, ...props}, ref): JSX.Element {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    )
  }
) as ContainerComponentType

Container.Outer = OuterContainer
Container.Inner = InnerContainer

export default Container
