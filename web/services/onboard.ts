
import Notify from 'bnc-notify'
import Onboard from 'bnc-onboard'

const dappId = process.env.NEXT_PUBLIC_BLOCK_KEY;
const networkId:number = parseInt(process.env.NEXT_PUBLIC_BLOCK_NETWORK_ID);

export function initOnboard(subscriptions: any) {
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

export function initNotify() {
  return Notify({
    dappId,
    networkId,
    onerror: error => console.log(`Notify error: ${error.message}`)
  })
}