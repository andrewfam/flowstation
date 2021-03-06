/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext } from 'react'
import { useOnboard, login } from '@services/onboard';
import AuthUserContext from '@contexts/user';


const Login: FC = () => {
  const { wallet, setWallet } = useContext(AuthUserContext);

  const [onboard, provider] = useOnboard(setWallet);

  return (
    <div>
              <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => login(onboard, provider)}
              >
                Select a Wallet
              </button>
      


    </div>
  )
}

export default Login
