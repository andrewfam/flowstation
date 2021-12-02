/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { initOnboard } from '@services/onboard';
import AuthUserContext from '@contexts/user';


const Login: FC = () => {
  const [onboard, setOnboard] = useState(null);
  const { wallet, setWallet } = useContext(AuthUserContext);

  useEffect(() =>{
    
    const mOnboard = initOnboard({
      wallet: (mwallet: { provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc; }) => {

        if (mwallet.provider) {
          setWallet(mwallet)
          // console.log(`${mwallet.name} is now connected!`);
        }
      }
    })
    setOnboard(mOnboard)
  }, []);

  
  const login = async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  }


  return (
    <div>
      
              <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={login}
              >
                Select a Wallet
              </button>
      


    </div>
  )
}

export default Login
