import {
  createContext,
  PropsWithChildren,
  Dispatch,
  useContext,
  Context,
  useReducer,
} from 'react'
import type { Transaction } from 'web3-core'

export interface State {
  address: Address
  balance: Amount
  balanceUSD: Amount
  activity: Transaction[]
}

const initialState: State = {
  address: '',
  balance: '',
  balanceUSD: '',
  activity: [],
}

const noopDispatch: Dispatch<Partial<State>> = (value: Partial<State>) => {}

export const AppContext: Context<[State, Dispatch<Partial<State>>]> =
  createContext([initialState, noopDispatch])

function reducer(prevState: State, partialState: Partial<State>): State {
  if (partialState) {
    return {
      ...prevState,
      ...partialState,
    }
  }

  return prevState
}

export function AppContextProvider({ children }: PropsWithChildren) {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): [State, Dispatch<Partial<State>>] {
  return useContext(AppContext)
}
