import { TodoBoard } from '../../../widgets/todo-board'
import styles from './TodoPage.module.css'

export function TodoPage() {
  return (
    <main className={styles.page}>
      <TodoBoard />
    </main>
  )
}
