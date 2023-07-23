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
          137: '0x74156E7CCe407169797053E1A1A17B0C1F920a90', // polygon
          59144: '0x898B1a78A78A17dE24a63372149C391Ac90fbddc', // linea
          1101: '0x8193A58Cf26bbD0A865B83EdB004e2C138260AFc', // zkevm
          100: '0x898B1a78A78A17dE24a63372149C391Ac90fbddc', // gnosis
        },
      },
    }),
  ],
})
