import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useMemo } from 'react'

export default function AccountMenu() {
  const items = useMemo(
    () => [
      {
        key: 'vesting',
        label: 'Vesting Tokens',
        onClick: () => {},
      },
      {
        key: 'claim',
        label: 'Cliam Tokens',
        onClick: () => {},
      },
    ],
    [],
  )

  return (
    <Dropdown
      className="absolute top-2 right-2"
      menu={{ items }}
      placement="bottomRight"
    >
      <Button type="ghost" className="border-0" icon={<MenuOutlined />} />
    </Dropdown>
  )
}
