import { createContext } from "react"

export type UserContext = {
  wallet: string,
  notify: object,
  setWallet:(c: string) => void,
  setNotify:(c: object) => void
}

const AuthUserContext = createContext<UserContext>({wallet: '', notify: {}, setWallet: () => '', setNotify: () => {}});

export default AuthUserContext;
