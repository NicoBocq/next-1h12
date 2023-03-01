import {FC, HTMLAttributes, PropsWithChildren} from 'react'

import clsx from 'clsx'

const Prose: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}

export default Prose
