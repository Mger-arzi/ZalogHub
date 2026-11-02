import { DeleteOutlined } from '@ant-design/icons'
import { Button, Checkbox, Popconfirm } from 'antd'

import type { Todo } from '../model/types'
import styles from './TodoItem.module.css'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? styles.itemDone : styles.item}>
      <Checkbox
        className={styles.check}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      >
        <span className={todo.completed ? styles.titleDone : styles.title}>
          {todo.title}
        </span>
      </Checkbox>
      <Popconfirm
        title="Удалить задачу?"
        description={`«${todo.title}» будет удалена.`}
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
        onConfirm={() => onDelete(todo.id)}
      >
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          aria-label={`Удалить задачу «${todo.title}»`}
        />
      </Popconfirm>
    </li>
  )
}
