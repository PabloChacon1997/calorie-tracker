import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import { acitivityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer";


type ActivityProviderProps = {
  children: ReactNode
}


type ActivityContextProps = {
  state: ActivityState
  dispatch: Dispatch<ActivityActions>
}

// eslint-disable-next-line react-refresh/only-export-components
export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [ state, dispatch ] = useReducer(acitivityReducer, initialState)
  return (
    <ActivityContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </ActivityContext.Provider>
  )
}