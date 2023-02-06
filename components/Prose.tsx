import clsx from 'clsx'

export type ProseProps = {
  className?: string
  children: React.ReactNode
}

const Prose = ({ children, className }: ProseProps): JSX.Element => {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}

export default Prose
