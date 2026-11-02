import { ClearOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type ClearCompletedButtonProps = {
  disabled?: boolean
  onClear: () => void
}

export function ClearCompletedButton({ disabled = false, onClear }: ClearCompletedButtonProps) {
  return (
    <Button type="text" icon={<ClearOutlined />} disabled={disabled} onClick={onClear}>
      Очистить выполненные
    </Button>
  )
}
