import { createContext, FunctionComponent, ReactNode, useReducer } from "react";

export interface Props {
  children?: ReactNode
}

export const ADD_NOTIFICATION = 'add_notitication'
export const REMOVE_NOTIFICATION = 'remove_notitication'
export const REMOVE_ALL_NOTIFICATIONS = 'remove_all_notifications'

export interface Action {
  type: string
  data: string
}

export type State = string[]

const notificationReducer = (state: State, action: Action) => {
  const tmp = [ ...state ]
  switch (action.type) {
    case ADD_NOTIFICATION:
      tmp.push(action.data)
      return tmp
    case REMOVE_NOTIFICATION:
      const index = tmp.indexOf(action.data)
      if (index === -1)
        return state
      tmp.splice(index, 1)
      return tmp
    case REMOVE_ALL_NOTIFICATIONS:
      return []
    default:
      return state
  }
}

export const Context = createContext<[State, React.Dispatch<Action>]>([[], () => {}])

const Store: FunctionComponent<Props> = ({ children }) => {
  const [ state, dispatch ] = useReducer(notificationReducer, [])
  return <Context.Provider value={[state, dispatch]}>
    {children}
  </Context.Provider>
}

export default Store

