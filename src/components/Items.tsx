import { useContext } from "react"
import type { Item } from "../types/bill"
import { getUniqueId } from "../helpers"
import ItemInput from "./ItemInput"
import { StoreContext } from "../store"
import { addItem } from "../store/actions"
import { Button } from "flowbite-react"
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
        <h2 className="text-3xl my-2">Items</h2>
        <p className="my-2">Add each line item</p>
        <Button className="w-full" onClick={() => addItemHandler()}>Add Item</Button>
        
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