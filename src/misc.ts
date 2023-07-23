export const ZKBOB_DIRECT_DEPOSIT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_pool', type: 'address' },
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'uint256', name: '_denominator', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256[]', name: 'indices', type: 'uint256[]' }],
    name: 'CompleteDirectDepositBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'receiver', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'RefundDirectDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'fallbackUser', type: 'address' },
      {
        components: [
          { internalType: 'bytes10', name: 'diversifier', type: 'bytes10' },
          { internalType: 'bytes32', name: 'pk', type: 'bytes32' },
        ],
        indexed: false,
        internalType: 'struct ZkAddress.ZkAddress',
        name: 'zkAddress',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint64', name: 'deposit', type: 'uint64' },
    ],
    name: 'SubmitDirectDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint64', name: 'fee', type: 'uint64' }],
    name: 'UpdateDirectDepositFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint40', name: 'timeout', type: 'uint40' }],
    name: 'UpdateDirectDepositTimeout',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'manager', type: 'address' }],
    name: 'UpdateOperatorManager',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256[]', name: '_indices', type: 'uint256[]' },
      { internalType: 'uint256', name: '_out_commit', type: 'uint256' },
    ],
    name: 'collect',
    outputs: [
      { internalType: 'uint256', name: 'total', type: 'uint256' },
      { internalType: 'uint256', name: 'totalFee', type: 'uint256' },
      { internalType: 'uint256', name: 'hashsum', type: 'uint256' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_fallbackUser', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_rawZkAddress', type: 'bytes' },
    ],
    name: 'directDeposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_fallbackUser', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'string', name: '_zkAddress', type: 'string' },
    ],
    name: 'directDeposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'directDepositFee',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'directDepositNonce',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'directDepositTimeout',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'getDirectDeposit',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'fallbackReceiver', type: 'address' },
          { internalType: 'uint96', name: 'sent', type: 'uint96' },
          { internalType: 'uint64', name: 'deposit', type: 'uint64' },
          { internalType: 'uint64', name: 'fee', type: 'uint64' },
          { internalType: 'uint40', name: 'timestamp', type: 'uint40' },
          { internalType: 'enum IZkBobDirectDeposits.DirectDepositStatus', name: 'status', type: 'uint8' },
          { internalType: 'bytes10', name: 'diversifier', type: 'bytes10' },
          { internalType: 'bytes32', name: 'pk', type: 'bytes32' },
        ],
        internalType: 'struct IZkBobDirectDeposits.DirectDeposit',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'onTokenTransfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operatorManager',
    outputs: [{ internalType: 'contract IOperatorManager', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pool', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pool_id', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [{ internalType: 'uint256[]', name: '_indices', type: 'uint256[]' }],
    name: 'refundDirectDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'refundDirectDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint64', name: '_fee', type: 'uint64' }],
    name: 'setDirectDepositFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint40', name: '_timeout', type: 'uint40' }],
    name: 'setDirectDepositTimeout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'contract IOperatorManager', name: '_operatorManager', type: 'address' }],
    name: 'setOperatorManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'token', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const SPOKEPOOL_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'beacon', type: 'address' }], name: 'BeaconUpgraded', type: 'event' },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'rootBundleId', type: 'uint256' }],
    name: 'EmergencyDeleteRootBundle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'originToken', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'EnabledDepositRoute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'amountToReturn', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { indexed: false, internalType: 'uint256[]', name: 'refundAmounts', type: 'uint256[]' },
      { indexed: true, internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      { indexed: true, internalType: 'uint32', name: 'leafId', type: 'uint32' },
      { indexed: false, internalType: 'address', name: 'l2TokenAddress', type: 'address' },
      { indexed: false, internalType: 'address[]', name: 'refundAddresses', type: 'address[]' },
      { indexed: false, internalType: 'address', name: 'caller', type: 'address' },
    ],
    name: 'ExecutedRelayerRefundRoot',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFilledAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fillAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'repaymentChainId', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { indexed: false, internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { indexed: false, internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { indexed: true, internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { indexed: false, internalType: 'address', name: 'destinationToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'relayer', type: 'address' },
      { indexed: true, internalType: 'address', name: 'depositor', type: 'address' },
      { indexed: false, internalType: 'address', name: 'recipient', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'message', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'bytes', name: 'message', type: 'bytes' },
          { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
          { internalType: 'bool', name: 'isSlowRelay', type: 'bool' },
          { internalType: 'int256', name: 'payoutAdjustmentPct', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct SpokePool.RelayExecutionInfo',
        name: 'updatableRelayData',
        type: 'tuple',
      },
    ],
    name: 'FilledRelay',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { indexed: false, internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { indexed: true, internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { indexed: false, internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { indexed: false, internalType: 'address', name: 'originToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'recipient', type: 'address' },
      { indexed: true, internalType: 'address', name: 'depositor', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'message', type: 'bytes' },
    ],
    name: 'FundsDeposited',
    type: 'event',
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }], name: 'Initialized', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' }], name: 'PausedDeposits', type: 'event' },
  { anonymous: false, inputs: [{ indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' }], name: 'PausedFills', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'relayer', type: 'address' },
      { indexed: false, internalType: 'address', name: 'refundToken', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { indexed: false, internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { indexed: true, internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { indexed: false, internalType: 'uint256', name: 'fillBlock', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'previousIdenticalRequests', type: 'uint256' },
    ],
    name: 'RefundRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      { indexed: true, internalType: 'bytes32', name: 'relayerRefundRoot', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'slowRelayRoot', type: 'bytes32' },
    ],
    name: 'RelayedRootBundle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int64', name: 'newRelayerFeePct', type: 'int64' },
      { indexed: true, internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { indexed: true, internalType: 'address', name: 'depositor', type: 'address' },
      { indexed: false, internalType: 'address', name: 'updatedRecipient', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'updatedMessage', type: 'bytes' },
      { indexed: false, internalType: 'bytes', name: 'depositorSignature', type: 'bytes' },
    ],
    name: 'RequestedSpeedUpDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newBuffer', type: 'uint32' }],
    name: 'SetDepositQuoteTimeBuffer',
    type: 'event',
  },
  { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'newHubPool', type: 'address' }], name: 'SetHubPool', type: 'event' },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'newAdmin', type: 'address' }],
    name: 'SetXDomainAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'amountToReturn', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { indexed: true, internalType: 'uint32', name: 'leafId', type: 'uint32' },
      { indexed: true, internalType: 'address', name: 'l2TokenAddress', type: 'address' },
      { indexed: false, internalType: 'address', name: 'caller', type: 'address' },
    ],
    name: 'TokensBridged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'implementation', type: 'address' }],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_TRANSFER_SIZE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SLOW_FILL_MAX_TOKENS_TO_SEND',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UPDATE_DEPOSIT_DETAILS_HASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_initialDepositId', type: 'uint32' },
      { internalType: 'address', name: '_crossDomainAdmin', type: 'address' },
      { internalType: 'address', name: '_hubPool', type: 'address' },
      { internalType: 'address', name: '_wrappedNativeTokenAddress', type: 'address' },
    ],
    name: '__SpokePool_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'chainId', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [],
    name: 'crossDomainAdmin',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'depositCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositQuoteTimeBuffer',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'rootBundleId', type: 'uint256' }],
    name: 'emergencyDeleteRootBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'enabledDepositRoutes',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      {
        components: [
          { internalType: 'uint256', name: 'amountToReturn', type: 'uint256' },
          { internalType: 'uint256', name: 'chainId', type: 'uint256' },
          { internalType: 'uint256[]', name: 'refundAmounts', type: 'uint256[]' },
          { internalType: 'uint32', name: 'leafId', type: 'uint32' },
          { internalType: 'address', name: 'l2TokenAddress', type: 'address' },
          { internalType: 'address[]', name: 'refundAddresses', type: 'address[]' },
        ],
        internalType: 'struct SpokePoolInterface.RelayerRefundLeaf',
        name: 'relayerRefundLeaf',
        type: 'tuple',
      },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'executeRelayerRefundLeaf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'int256', name: 'payoutAdjustment', type: 'int256' },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'executeSlowRelayLeaf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'fillCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'maxTokensToSend', type: 'uint256' },
      { internalType: 'uint256', name: 'repaymentChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'fillRelay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'updatedRecipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'maxTokensToSend', type: 'uint256' },
      { internalType: 'uint256', name: 'repaymentChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'int64', name: 'updatedRelayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'bytes', name: 'updatedMessage', type: 'bytes' },
      { internalType: 'bytes', name: 'depositorSignature', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'fillRelayWithUpdatedDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'hubPool', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'uint32', name: '_initialDepositId', type: 'uint32' },
      { internalType: 'address', name: '_hubPool', type: 'address' },
      { internalType: 'address', name: '_wethAddress', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberOfDeposits',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [{ internalType: 'bool', name: 'pause', type: 'bool' }],
    name: 'pauseDeposits',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'pause', type: 'bool' }],
    name: 'pauseFills',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'pausedDeposits', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pausedFills', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'proxiableUUID', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'refundsRequested',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'relayFills',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'relayerRefundRoot', type: 'bytes32' },
      { internalType: 'bytes32', name: 'slowRelayRoot', type: 'bytes32' },
    ],
    name: 'relayRootBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'refundToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'uint256', name: 'fillBlock', type: 'uint256' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'requestRefund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'rootBundles',
    outputs: [
      { internalType: 'bytes32', name: 'slowRelayRoot', type: 'bytes32' },
      { internalType: 'bytes32', name: 'relayerRefundRoot', type: 'bytes32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newCrossDomainAdmin', type: 'address' }],
    name: 'setCrossDomainAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newDepositQuoteTimeBuffer', type: 'uint32' }],
    name: 'setDepositQuoteTimeBuffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'setEnableRoute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newHubPool', type: 'address' }],
    name: 'setHubPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'int64', name: 'updatedRelayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'address', name: 'updatedRecipient', type: 'address' },
      { internalType: 'bytes', name: 'updatedMessage', type: 'bytes' },
      { internalType: 'bytes', name: 'depositorSignature', type: 'bytes' },
    ],
    name: 'speedUpDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newImplementation', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wrappedNativeToken',
    outputs: [{ internalType: 'contract WETH9Interface', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]

declare const polygon: {
  readonly id: 137
  readonly name: 'Polygon'
  readonly network: 'matic'
  readonly nativeCurrency: {
    readonly name: 'MATIC'
    readonly symbol: 'MATIC'
    readonly decimals: 18
  }
  readonly rpcUrls: {
    readonly alchemy: {
      readonly http: readonly ['https://polygon-mainnet.g.alchemy.com/v2']
      readonly webSocket: readonly ['wss://polygon-mainnet.g.alchemy.com/v2']
    }
    readonly infura: {
      readonly http: readonly ['https://polygon-mainnet.infura.io/v3']
      readonly webSocket: readonly ['wss://polygon-mainnet.infura.io/ws/v3']
    }
    readonly default: {
      readonly http: readonly ['https://polygon-rpc.com']
    }
    readonly public: {
      readonly http: readonly ['https://polygon-rpc.com']
    }
  }
  readonly blockExplorers: {
    readonly etherscan: {
      readonly name: 'PolygonScan'
      readonly url: 'https://polygonscan.com'
    }
    readonly default: {
      readonly name: 'PolygonScan'
      readonly url: 'https://polygonscan.com'
    }
  }
  readonly contracts: {
    readonly multicall3: {
      readonly address: '0xca11bde05977b3631167028862be2a173976ca11'
      readonly blockCreated: 25770160
    }
  }
}
