import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, type MenuProps, message, notification } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import type { Transaction } from 'web3-core'
import { notifyError } from '../../utils/notify'
import { toLocalePrice } from '../../utils/numeral'
import { claimTokens, getTotalVesting } from '../../utils/web3'
import Loading from '../Loading'

interface AccountMenuProps {
  address: Address
}

export default function AccountMenu({ address }: AccountMenuProps) {
  const [querying, setQuerying] = useState(false)

  const onTotalVestingClick = useCallback(async () => {
    // setQuerying(true)

    try {
      const totalVesting = await getTotalVesting(address)
      message.info(
        `There is a total of ${toLocalePrice(totalVesting, 0)} vesting tokens`,
        5, // duration of the message
      )
    } catch (err) {
      console.error('[onTotalVestingClick] Error:', err)
      notifyError('Error getting total vesting tokens', err)
    } finally {
      // setQuerying(false)
    }
  }, [])

  const onClaimTokensClick = useCallback(async () => {
    setQuerying(true)

    try {
      await claimTokens(address)
    } catch (err) {
      console.error('[onClaimTokensClick] Error:', err)
      notifyError('Error claiming tokens', err)
    } finally {
      setQuerying(false)
    }
  }, [])

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'vesting',
        label: 'Vesting Tokens',
        onClick: onTotalVestingClick,
      },
      {
        key: 'claim',
        label: 'Claim Tokens',
        onClick: onClaimTokensClick,
      },
    ],
    [],
  )

  return (
    <div>
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
