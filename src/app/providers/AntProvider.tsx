import { App, ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import type { ReactNode } from 'react'

type AntProviderProps = {
  children: ReactNode
}

export function AntProvider({ children }: AntProviderProps) {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#6f5b45',
          colorText: '#2b241c',
          borderRadius: 12,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  )
}
