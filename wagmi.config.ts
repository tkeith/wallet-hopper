import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions({
      getContract: true,
      readContract: true,
      prepareWriteContract: true,
      watchContractEvent: true,
    }),
    hardhat({
      project: './contracts',
      deployments: {
        WalletHopper: {
          137: '0x74156E7CCe407169797053E1A1A17B0C1F920a90',
        },
      },
    }),
  ],
})
