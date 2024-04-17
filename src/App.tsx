import { useEffect, useReducer } from "react"
import {StoreContext} from "./store"
import { reducer, initialState } from "./store/reducers"
import People from "./components/People"
import Items from "./components/Items"
import Total from "./components/Total"

function App() {
  const savedState = localStorage.getItem("globalState") ? JSON.parse(localStorage.getItem("globalState") || "") : initialState
  const [globalState, dispatch] = useReducer(reducer, savedState)
  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(globalState))
  }, [globalState])
  return (
    <div className="App">
      <StoreContext.Provider value = {[globalState, dispatch]}>
        <div className="mx-auto mt-8 container px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2 max-w-4xl p-4">
              <div className="mb-8">
                <h1 className="text-4xl mb-4">Simply Split</h1>
                <p>A simple tool for simple bill splitting. Designed for DoorDash / UberEats group orders, restaurant bills, grocery receipts, and any other basic multi-person bill.</p>
              </div>
            <People />
            <Items />
            </div>
            <div className="md:col-span-1">
            <Total />
            </div>
          </div>
        
        
        </div>
        
      </StoreContext.Provider>
    </div>
  )
}
export default App
