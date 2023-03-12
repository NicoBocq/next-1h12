import {Stack} from '@/types'

import Badge from './Badge'

export type FiltersProps = {
  filters?: Stack[] | null
  handleOnSelect: (value: number) => void
  selectedFilters: number[]
}

function StacksFilter({
  filters,
  handleOnSelect,
  selectedFilters,
}: FiltersProps) {
  function isSelected(id: number) {
    return selectedFilters.includes(id)
  }

  return (
    <div className="border-t border-b border-zinc-100 py-4 sm:flex sm:items-start md:dark:border-zinc-700/40">
      <h3 className="flex-shrink-0 text-sm font-medium text-gray-500">
        Filter by stack
      </h3>

      <div
        aria-hidden="true"
        className="hidden h-5 w-px bg-zinc-100 dark:bg-zinc-700/40 sm:ml-4 sm:block"
      />

      <div className="mt-2 sm:mt-0 sm:ml-4">
        <div className="-m-1 flex flex-wrap items-center">
          {filters?.map((filter) => (
            <Badge
              label={filter.name}
              onClick={() => handleOnSelect(filter.id)}
              key={filter.id}
              isSelected={isSelected(filter.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StacksFilter
