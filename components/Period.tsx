export type PeriodProps = {
  start?: string | null
  end?: string | null
}

function Period({start, end}: PeriodProps) {
  const startValue = start ? start : ''
  const endValue = end ? end : 'Present'

  return (
    <>
      <time dateTime={startValue}>{startValue}</time>
      <span aria-hidden="true">—</span>
      <time dateTime={endValue}>{endValue}</time>
    </>
  )
}

export default Period
