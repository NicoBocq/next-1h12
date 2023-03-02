import {FC, FunctionComponent, HTMLAttributes, ReactNode} from 'react'

import clsx from 'clsx'
import Link, {LinkProps} from 'next/link'

export type SocialLinkProps = LinkProps & {
  icon: FunctionComponent<HTMLAttributes<SVGElement>>
  children?: ReactNode
}

const SocialLink: FC<SocialLinkProps> = ({icon: Icon, children, ...props}) => {
  return (
    <Link
      {...props}
      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
    >
      <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      {children && <span className="ml-4">{children}</span>}
    </Link>
  )
}

export default SocialLink
