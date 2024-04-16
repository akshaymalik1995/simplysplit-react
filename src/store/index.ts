import React from "react"

import { State, Action } from "../types/store"


export const StoreContext = React.createContext<[State, React.Dispatch<Action>] | []>([])