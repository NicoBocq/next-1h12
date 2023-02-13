import {HTMLAttributes, ReactNode} from 'react'

import clsx from 'clsx'

const Prose = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}

export default Prose
