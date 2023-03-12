import {useMemo, useState} from 'react'

import {Stack} from '@/types'
interface UseStackFilersProps<T> {
  list: T[] | null
}

const useStackFilers = <T extends {stack: Stack[]}>({
  list,
}: UseStackFilersProps<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([])

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

  return {filteredList, handleOnSelect, selectedFilters} as const
}

export default useStackFilers
