import { createContext } from "react"

export type UserContext = {
  wallet: object,
  notify: object,
  setWallet:(c: object) => void,
  setNotify:(c: object) => void
}

const AuthUserContext = createContext<UserContext>({wallet: {}, notify: {}, setWallet: () => {}, setNotify: () => {}});

export default AuthUserContext;
