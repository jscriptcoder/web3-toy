/**
 * For this small application I'm gonna be using Context API
 * and the help of useReducer to manage the state
 */

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
  isConnected: boolean
  activity: Transaction[]
  receipts: TransactionReceipt[]
}

const initialState: State = {
  address: '',
  balance: '',
  balanceUSD: '',
  isConnected: false,
  activity: [],
  receipts: [],
}

const noopDispatch: Dispatch<Partial<State>> = (value: Partial<State>) => {}

export const AppContext: Context<[State, Dispatch<Partial<State>>]> =
  createContext([initialState, noopDispatch])

/**
 * Nothing fancy on this reducer. It simply creates a new object
 * every time we change any state property
 */
function reducer(prevState: State, partialState: Partial<State>): State {
  if (partialState) {
    console.log('[appStore/reducer] Previous state:', prevState)

    const newState = {
      ...prevState,
      ...partialState,
    }

    console.log('[appStore/reducer] New state:', newState)

    return newState
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
