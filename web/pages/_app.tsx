import '../styles/globals.css';

import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC, useState } from 'react'
import AuthUserContext from '@contexts/user';
import { useLocalStorage } from 'react-use';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [wallet, setWallet] = useLocalStorage('wallet', '');
  const [notify, setNotify] = useState({});

  return(
    <AuthUserContext.Provider
      value= {{ notify, wallet, setNotify, setWallet, }}
    >
      <Head>
        <title>{process.env.appName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Component {...pageProps} />
    </AuthUserContext.Provider>
  )
};

export default App
