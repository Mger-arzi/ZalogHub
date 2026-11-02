import { Segmented } from 'antd'

import type { TodoFilter, TodoFilterCounts } from '../model/types'
import styles from './TodoFilters.module.css'

type TodoFiltersProps = {
  value: TodoFilter
  counts: TodoFilterCounts
  onChange: (value: TodoFilter) => void
}

const FILTERS: { value: TodoFilter; caption: string }[] = [
  { value: 'all', caption: 'Все' },
  { value: 'active', caption: 'Активные' },
  { value: 'completed', caption: 'Выполненные' },
]

function isTodoFilter(value: string | number): value is TodoFilter {
  return value === 'all' || value === 'active' || value === 'completed'
}

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  return (
    <Segmented
      className={styles.filters}
      block
      value={value}
      aria-label="Фильтр задач"
      options={FILTERS.map((filter) => ({
        value: filter.value,
        label: (
          <span className={styles.label}>
            <span>{filter.caption}</span>
            <span className={styles.count}>{counts[filter.value]}</span>
          </span>
        ),
      }))}
      onChange={(next) => {
        if (isTodoFilter(next)) onChange(next)
      }}
    />
  )
}
