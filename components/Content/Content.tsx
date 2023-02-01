import Image from 'next/image'
import { Layout, Typography } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
import useContent from './useContent'

export default function Content() {
  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box">
          <Typography.Title className="text-shadow">
            Connet your Wallet
          </Typography.Title>
        </div>
      </div>
    </Layout.Content>
  )
}
