import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, message } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { notifyError } from '../../utils/notify'
import { toLocalePrice } from '../../utils/numeral'
import { claimTokens, getTotalVesting } from '../../utils/web3'
import Loading from '../Loading'

interface AccountMenuProps {
  address: Address
}

export default function AccountMenu({ address }: AccountMenuProps) {
  const [querying, setQuerying] = useState(false)
  const [messageApi, messageHolder] = message.useMessage()

  const onTotalVestingClick = useCallback(async () => {
    setQuerying(true)

    try {
      const totalVesting = await getTotalVesting(address)
      messageApi.info(
        `There is a total of ${toLocalePrice(totalVesting, 0)} vesting tokens`,
      )
    } catch (err) {
      console.error(err)
      notifyError('Error getting total vesting tokens', err)
    } finally {
      setQuerying(false)
    }
  }, [])

  const onClaimTokensClick = useCallback(async () => {
    setQuerying(true)

    try {
      const tx = await claimTokens(address)
      // TODO
      console.log(tx)
    } catch (err) {
      console.error(err)
      notifyError('Error claiming tokens', err)
    } finally {
      setQuerying(false)
    }
  }, [])

  const items = useMemo(
    () => [
      {
        key: 'vesting',
        label: 'Vesting Tokens',
        onClick: onTotalVestingClick,
      },
      {
        key: 'claim',
        label: 'Cliam Tokens',
        onClick: onClaimTokensClick,
      },
    ],
    [],
  )

  return (
    <div>
      {messageHolder}
      <Dropdown
        className="absolute top-3 right-3"
        menu={{ items }}
        placement="bottomRight"
      >
        <Button type="ghost" className="border-0" icon={<MenuOutlined />} />
      </Dropdown>

      <Loading
        show={querying}
        title="Querying smart contract..."
        tip="Please wait"
      />
    </div>
  )
}
