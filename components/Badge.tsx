import {FC, MouseEvent, ReactNode} from 'react'

import clsx from 'clsx'

export type BadgeProps = {
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void
  children?: ReactNode
  label: string
  isSelected?: boolean
}

const Badge: FC<BadgeProps> = ({children, onClick, label, isSelected}) => {
  const handleOnClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!onClick) return

    event.preventDefault()
    onClick(event)
  }

  return (
    <span
      className={clsx(
        'm-1 inline-flex items-center rounded-full border bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-800 transition duration-300 dark:bg-zinc-700 dark:text-zinc-100',
        onClick && 'cursor-pointer',
        isSelected && onClick
          ? 'border-teal-500 text-teal-500 dark:border-teal-400 dark:text-teal-400'
          : !isSelected && onClick
          ? 'border-zinc-200 hover:border-teal-500 dark:text-zinc-200 dark:hover:border-teal-500'
          : ''
      )}
      onClick={handleOnClick}
      aria-pressed={isSelected}
    >
      <span>{label || children}</span>
    </span>
  )
}

export default Badge
