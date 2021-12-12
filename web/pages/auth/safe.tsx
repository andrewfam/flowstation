/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext } from 'react'
import { useOnboard, usePreloadWallet, readyToTransact } from '@services/onboard';
import AuthUserContext from '@contexts/user';

import { ethers } from 'ethers'
import { ContractNetworksConfig, EthersAdapter, Safe, SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'


const Login: FC = () => {
  const { wallet, setWallet } = useContext(AuthUserContext);

  const [onboard, provider] = useOnboard(setWallet);

  usePreloadWallet(onboard, wallet);    

  const createSafe = async () => {
    const ready = readyToTransact(onboard, provider);
    if (!ready) return

    const safeOwner = provider.getSigner(0)
    const ethAdapter = new EthersAdapter({
      ethers,
      signer: safeOwner,
    })

    const id = await ethAdapter.getChainId();

    const contractNetworks: ContractNetworksConfig = {
      [id]: {
        multiSendAddress: '',
        safeMasterCopyAddress: '0xC4180A6A9EeCc46Ae83b6281C07EC1c6544fe581',
        safeProxyFactoryAddress: '0x971497458154c42a3d96B8c03453cB97219ce7Ee'
      }
    }

    const safeFactory = await SafeFactory.create({ ethAdapter, contractNetworks })
    
    const owners = ['0xb0Cd4d70e7254bdd90E34d7B09d207F06970B318', '0xdA3fCC99CeE4AC3152599F0C86b075661ad0316d']
    const threshold = 2
    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
      // ...
    }

    const safeSdk: Safe = await safeFactory.deploySafe(safeAccountConfig)

    const newSafeAddress = safeSdk.getAddress()

    console.log(newSafeAddress);
  }


  return (
    <div>
      
              <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={createSafe}
              >
                Create Safe
              </button>
      


    </div>
  )
}

export default Login
