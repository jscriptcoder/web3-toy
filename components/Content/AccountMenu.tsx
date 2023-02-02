import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useAppContext } from '../../context/appStore'
import { notifyError } from '../../utils/notify'
import { claimTokens, getTotalVested } from '../../utils/web3'
import Loading from '../Loading'

interface AccountMenuProps {
  address: Address
}

export default function AccountMenu({ address }: AccountMenuProps) {
  const [querying, setQuerying] = useState(false)

  const onTotalVestingClick = useCallback(async () => {
    setQuerying(true)

    try {
      const totalVesting = await getTotalVested(address)
      console.log(totalVesting)
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
      await claimTokens(address)
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
      <Dropdown
        className="absolute top-2 right-2"
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
