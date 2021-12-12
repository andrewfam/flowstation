
import Notify from 'bnc-notify'
import Onboard from 'bnc-onboard'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const dappId = process.env.NEXT_PUBLIC_BLOCK_KEY;
const networkId:number = parseInt(process.env.NEXT_PUBLIC_BLOCK_NETWORK_ID);

function initOnboard(subscriptions: any) {
  return Onboard({
    dappId,
    networkId,
    hideBranding: false,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '10' }
    ]
  })
}

function initNotify() {
  return Notify({
    dappId,
    networkId,
    onerror: error => console.log(`Notify error: ${error.message}`)
  })
}

const useOnboard = (setWallet:any) => {
  const [onboard, setOnboard] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() =>{
    const mOnboard = initOnboard({
      wallet: (wallet:any) => {
        if (wallet.provider) {
          const ethersProvider = new ethers.providers.Web3Provider(
            wallet.provider
          )

          setProvider(ethersProvider);
          setWallet(wallet.name);
          console.log(provider)
        } else {
          setProvider(null);
        }
      }
    })
    setOnboard(mOnboard);
  }, []);

  return [onboard, provider];
}

const usePreloadWallet = (onboard:any, wallet:any) => {
  useEffect(() => {
    if (wallet && onboard) {
      onboard.walletSelect(wallet)
    }
  }, [onboard])
}

const readyToTransact = async (onboard:any, provider:any) => {
  if (!provider) {
    const walletSelected = await onboard.walletSelect()
    if (!walletSelected) return false
  }

  const ready = await onboard.walletCheck()
  return ready
}

const login = async (onboard:any, provider:any) => {
  const walletSelected = await onboard.walletSelect();
  if (!walletSelected && onboard) return false;
  readyToTransact(onboard, provider);
}


export { login, readyToTransact, useOnboard, usePreloadWallet }
