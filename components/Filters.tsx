import {FC} from 'react'

import {Transition} from '@headlessui/react'

import {Stack} from '@/types'

import Badge from './Badge'

export type FiltersProps = {
  filters?: Stack[]
  handleOnSelect: (value: number) => void
  selectedFilters: number[]
}

const Filters: FC<FiltersProps> = ({
  filters,
  handleOnSelect,
  selectedFilters,
}) => {
  const isSelected = (id: number) => selectedFilters.includes(id)
  return (
    <div className="sm:flex sm:items-center">
      <h3 className="text-sm font-medium text-gray-500">
        Filter by stack
        <span className="sr-only">, active</span>
      </h3>

      <div
        aria-hidden="true"
        className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
      />

      <div className="mt-2 sm:mt-0 sm:ml-4">
        <Transition
          show={true}
          appear={true}
          as="div"
          className="-m-1 flex flex-wrap items-center space-x-2"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0 transform-x-full"
          enterTo="opacity-100 transform-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100 transform-x-0"
          leaveTo="opacity-0 -transform-x-full"
        >
          {filters?.map((filter) => (
            <Badge
              label={filter.name}
              onClick={() => setTimeout(() => handleOnSelect(filter.id), 300)}
              onRemove={() => setTimeout(() => handleOnSelect(filter.id), 300)}
              key={filter.id}
              isSelected={isSelected(filter.id)}
            />
          ))}
        </Transition>
      </div>
    </div>
  )
}

export default Filters
