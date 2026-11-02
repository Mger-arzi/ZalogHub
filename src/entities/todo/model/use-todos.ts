import { useCallback, useEffect, useState } from 'react'

import { TODOS_STORAGE_KEY } from '../../../shared/config/storage'
import { readJson, writeJson } from '../../../shared/lib/storage'
import type { Todo } from './types'

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== 'object') return false

  const todo = value as Record<string, unknown>
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  )
}

function readTodos(): Todo[] {
  const stored = readJson<unknown>(TODOS_STORAGE_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter(isTodo)
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(readTodos)

  useEffect(() => {
    writeJson(TODOS_STORAGE_KEY, todos)
  }, [todos])

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return false

    setTodos((current) => [
      { id: crypto.randomUUID(), title: trimmed, completed: false },
      ...current,
    ])
    return true
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed))
  }, [])

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted }
}
