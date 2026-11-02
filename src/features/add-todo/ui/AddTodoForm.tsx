import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, type InputRef } from 'antd'
import { useRef, useState } from 'react'

import styles from './AddTodoForm.module.css'

type AddTodoFormProps = {
  onAdd: (title: string) => boolean
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<InputRef>(null)

  const submit = () => {
    const added = onAdd(title)
    if (!added) {
      setError('Нельзя добавить пустую задачу')
      inputRef.current?.focus()
      return
    }

    setError('')
    setTitle('')
    inputRef.current?.focus()
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className={styles.field}>
        <Input
          ref={inputRef}
          size="large"
          value={title}
          status={error ? 'error' : undefined}
          placeholder="Что нужно сделать?"
          aria-label="Новая задача"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'add-todo-error' : undefined}
          autoFocus
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          onPressEnter={(event) => {
            event.preventDefault()
            submit()
          }}
        />
        <p id="add-todo-error" className={styles.error} role="alert">
          {error}
        </p>
      </div>
      <Button
        className={styles.submit}
        htmlType="submit"
        type="primary"
        size="large"
        icon={<PlusOutlined />}
      >
        Добавить
      </Button>
    </form>
  )
}
