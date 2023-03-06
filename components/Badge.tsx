import {FC, MouseEvent, ReactNode} from 'react'

import {XMarkIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'

export type BadgeProps = {
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
  label: string
  isSelected?: boolean
}

const Badge: FC<BadgeProps> = ({
  children,
  onClick,
  label,
  isSelected,
  onRemove,
}) => {
  const handleOnClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!onClick || isSelected) return

    event.preventDefault()
    onClick(event)
  }

  const handeOnRemove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!onRemove) return
    event.preventDefault()
    event.stopPropagation()
    onRemove(event)
  }

  return (
    <span
      className={clsx(
        'm-1 inline-flex items-center rounded-full border bg-zinc-100 py-0.5 pl-3 text-xs font-medium text-zinc-800 transition duration-300 dark:bg-zinc-700 dark:text-zinc-100',
        isSelected && onClick
          ? 'border-teal-500 pr-2 text-teal-500 dark:border-teal-400 dark:text-teal-400'
          : !isSelected && onClick
          ? 'cursor-pointer border-zinc-200 pr-3 hover:border-teal-500 dark:text-zinc-200 dark:hover:border-teal-500'
          : 'pr-3'
      )}
      onClick={handleOnClick}
      aria-pressed={isSelected}
    >
      <span>{label || children}</span>
      {isSelected && (
        <button
          type="button"
          className={clsx(
            'ml-1 inline-flex h-6 w-6 flex-shrink-0 rounded-full p-1 text-zinc-800 transition duration-300 hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-500'
          )}
          onClick={handeOnRemove}
        >
          <span className="sr-only">Remove filter for {label}</span>
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </span>
  )
}

export default Badge
