import {useMemo, useState} from 'react'

import {Stack} from '@/types'
interface UseStackFilersProps<T> {
  list: T[] | null
}

const useStackFilers = <T extends {stack: Stack[]}>({
  list,
}: UseStackFilersProps<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([])
  console.log(list)
  console.log(selectedFilters)
  const stacks = useMemo(() => {
    const flatLIst = list?.map((item) => item.stack).flat()

    return flatLIst
      ?.filter(
        (stack, index, self) =>
          index === self.findIndex((t) => t.id === stack.id)
      )
      .sort((a, b) => a.weight - b.weight)
  }, [list])

  const handleOnSelect = (stackId: number) => {
    if (selectedFilters.includes(stackId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== stackId))
    } else {
      setSelectedFilters([...selectedFilters, stackId])
    }
  }

  const filteredList = useMemo(() => {
    if (!selectedFilters.length) {
      return list
    }

    return list?.filter((item) => {
      const itemStacks = item.stack.map((stack) => stack.id)
      return selectedFilters.some((filter) => itemStacks.includes(filter))
    })
  }, [list, selectedFilters])

  return {filteredList, stacks, handleOnSelect, selectedFilters} as const
}

export default useStackFilers
