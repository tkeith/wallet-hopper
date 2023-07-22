import { ethers, network, run } from 'hardhat'

async function main() {
  console.log('Deploying Wallet Hopper...')

  const args: any[] = []
  const WalletHopper = await ethers.getContractFactory('WalletHopper')
  const walletHopper = await WalletHopper.deploy(...args)

  await walletHopper.deployed()

  console.log(`Wallet Hopper deployed to ${walletHopper.address}`)

  if (network.config.chainId != 31337) {
    console.log(`Waiting for block confirmation...`)
    await walletHopper.deployTransaction.wait(10)

    console.log('Verifying contract...')
    try {
      run('verify:verify', {
        address: walletHopper.address,
        constructorArguments: args,
        contract: 'contracts/WalletHopper.sol:WalletHopper',
      })
    } catch (e) {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
