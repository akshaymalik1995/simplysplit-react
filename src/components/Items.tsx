import { useContext } from "react"
import type { Item } from "../types/bill"
import { getUniqueId } from "../helpers"
import ItemInput from "./ItemInput"
import { StoreContext } from "../store"
import { addItem } from "../store/actions"

const Items = () => {
    const [ state, dispatch] = useContext(StoreContext)
    function addItemHandler(){
        const newItem : Item = {
            id : getUniqueId(),
            amount : 0,
            name : "",
            contributedBy : []
        }

        if (typeof dispatch === "function"){
            dispatch(addItem(newItem))
        }
        
    }
    return (
        <div className="my-8">
        <h2 className="text-3xl my-1">Items</h2>
        <p className="my-1">Add each line item</p>
        <button className="text-white my-1 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => addItemHandler()} >Add Item</button>
        <div>
            {state?.items.map(item => (
                <div key={item.id}>
                    <ItemInput item = {item}/>
                </div>
            ))}
        </div>
        </div>
        
       
        
    )
}

export default Items