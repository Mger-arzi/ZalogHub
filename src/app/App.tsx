import { TodoPage } from '../pages/todo'
import { AntProvider } from './providers/AntProvider'

export function App() {
  return (
    <AntProvider>
      <TodoPage />
    </AntProvider>
  )
}
