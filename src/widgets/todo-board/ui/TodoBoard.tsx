import { useState } from 'react'
import { Empty } from 'antd'

import { TodoItem, useTodos, type Todo } from '../../../entities/todo'
import { AddTodoForm } from '../../../features/add-todo'
import { ClearCompletedButton } from '../../../features/clear-completed'
import { TodoFilters, type TodoFilter } from '../../../features/filter-todos'
import { formatRemaining } from '../lib/format-remaining'
import styles from './TodoBoard.module.css'

function visibleTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  if (filter === 'active') return todos.filter((todo) => !todo.completed)
  if (filter === 'completed') return todos.filter((todo) => todo.completed)
  return todos
}

export function TodoBoard() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<TodoFilter>('all')

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount
  const shown = visibleTodos(todos, filter)
  const emptyText =
    todos.length === 0
      ? 'Список пуст. Добавьте первую задачу.'
      : 'В этом фильтре задач нет.'

  return (
    <section className={styles.board} aria-label="Список задач">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Задачи</h1>
          <p className={styles.remaining}>{formatRemaining(todos.length, activeCount)}</p>
        </div>
        <ClearCompletedButton disabled={completedCount === 0} onClear={clearCompleted} />
      </header>

      <AddTodoForm onAdd={addTodo} />

      <TodoFilters
        value={filter}
        counts={{
          all: todos.length,
          active: activeCount,
          completed: completedCount,
        }}
        onChange={setFilter}
      />

      <div className={styles.viewport}>
        {shown.length === 0 ? (
          <Empty className={styles.empty} description={emptyText} />
        ) : (
          <ul className={styles.list}>
            {shown.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
