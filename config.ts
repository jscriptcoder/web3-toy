// https://etherscan.io/address/0xb3f723783e67471F2469C3fc49E2905d5FabeE1d
export const contractAddress = '0xb3f723783e67471F2469C3fc49E2905d5FabeE1d'

// https://etherscan.io/address/0xb3f723783e67471F2469C3fc49E2905d5FabeE1d#code
export const contractAbi = [
  {
    inputs: [{ internalType: 'address', name: 'token_', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferPending',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldReceiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newReceiver',
        type: 'address',
      },
    ],
    name: 'ReceiverChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address',
      },
    ],
    name: 'RecoveredToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokensClaimed_',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination_',
        type: 'address',
      },
    ],
    name: 'TokensClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalTokens_',
        type: 'uint256',
      },
    ],
    name: 'VestingFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokensClaimed_',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination_',
        type: 'address',
      },
    ],
    name: 'VestingKilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
    ],
    name: 'VestingScheduleSet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'oldReceiver_', type: 'address' },
      { internalType: 'address', name: 'newReceiver_', type: 'address' },
    ],
    name: 'changeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'destination_', type: 'address' },
    ],
    name: 'claimTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver_', type: 'address' }],
    name: 'claimableTokens',
    outputs: [
      { internalType: 'uint256', name: 'claimableTokens_', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'totalTokens_', type: 'uint256' },
    ],
    name: 'fundVesting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'receiver_', type: 'address' },
      { internalType: 'address', name: 'destination_', type: 'address' },
    ],
    name: 'killVesting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token_', type: 'address' },
      { internalType: 'address', name: 'destination_', type: 'address' },
    ],
    name: 'recoverToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'receivers_', type: 'address[]' },
      {
        components: [
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'cliff', type: 'uint256' },
          { internalType: 'uint256', name: 'totalPeriods', type: 'uint256' },
          { internalType: 'uint256', name: 'timePerPeriod', type: 'uint256' },
          { internalType: 'uint256', name: 'totalTokens', type: 'uint256' },
          { internalType: 'uint256', name: 'tokensClaimed', type: 'uint256' },
        ],
        internalType: 'struct ITokenVesting.VestingSchedule[]',
        name: 'vestingSchedules_',
        type: 'tuple[]',
      },
    ],
    name: 'setVestingSchedules',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalVestingsTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner_', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'vestingScheduleOf',
    outputs: [
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'cliff', type: 'uint256' },
      { internalType: 'uint256', name: 'totalPeriods', type: 'uint256' },
      { internalType: 'uint256', name: 'timePerPeriod', type: 'uint256' },
      { internalType: 'uint256', name: 'totalTokens', type: 'uint256' },
      { internalType: 'uint256', name: 'tokensClaimed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as unknown as AbiItem
