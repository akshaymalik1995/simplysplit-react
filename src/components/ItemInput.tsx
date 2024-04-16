import type { Item, Person } from "../types/bill"
import { useContext, useState, useEffect, useReducer } from "react"
import { StoreContext } from "../store"
import { removeItem, addItem } from "../store/actions"
import { Action } from "../types/store"

// Writing a reducer function to keep track of the item state instead of useState

const updateItemAction = (payload : object) => {
    return {
        type : "UPDATE",
        payload : payload
    }
}

const itemReducer = (state : Item, action : Action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}


const ItemInput = (props: { item: Item }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const item: Item = props.item
    const [state, dispatch] = useContext(StoreContext)
    const [itemState, itemDispatch] = useReducer<React.Reducer<Item, Action>>(itemReducer, item)
    function removeItemHandler(id: string) {
        if (typeof (dispatch) === 'function') {
            dispatch(removeItem(id))
        }
    }

    useEffect(() => {
        itemDispatch(updateItemAction({contributedBy : [...itemState.contributedBy.filter(p => state?.people.find(person => person.id === p.id))]}))
    }, [state?.people])

    useEffect(() => {
        if (typeof dispatch === 'function') {
            dispatch(addItem(itemState))
        }
    }, [itemState])

    useEffect(() => {
        function handleClickOutside() {
            if (dropdownOpen) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [dropdownOpen])

    function toggleDropdown(e: React.MouseEvent) {
        e.stopPropagation()
        setDropdownOpen(!dropdownOpen)
        
        
    }

    function updateItem(payload : object){
        itemDispatch(updateItemAction(payload))
    }

    function updateItemHandler(e: React.FormEvent) {
        e.preventDefault()
    }

    function addEveryoneToContribution(){
        if (state){
            itemDispatch(updateItemAction({contributedBy : [...state.people]}))
        } 
    }

    function addContribution(person: Person) {
        // Check if the person is already in the list
        const personExists = itemState.contributedBy.find(p => p.id === person.id)
        if (personExists) { return }
        itemDispatch(updateItemAction({contributedBy : [...itemState.contributedBy, person]}))
    }
    function removeContribution(person: Person) {
        itemDispatch(updateItemAction({contributedBy : [...itemState.contributedBy.filter(p => p.id !== person.id)]}))
    }






    return (
        <>
            <div>
                <form onSubmit={(e) => updateItemHandler(e)} action="">
                    <div className="flex items-center space-x-4">
                        <input className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" step={0.01} value={itemState.amount || ""} onChange={(e) => updateItem({amount : +e.target.value})} placeholder="Amount" type="number" name="" id="" />
                        <input className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={itemState.name} onChange={(e) => updateItem({name : e.target.value})} placeholder="Item Name (Optional) " type="text" name="" id="" />
                        <button className="h-8 rounded w-20 bg-red-300 hover:bg-red-400 flex justify-center items-center" type="button" onClick={() => removeItemHandler(props.item.id)}>x</button>
                        <button type="submit"></button>
                       
                    {state && state?.people.length > 0 && (
                        <div className="relative">
                        <div onClick={(e) => toggleDropdown(e)} className="px-2 rounded py-2 border cursor-pointer">People</div>
                        <div className={`absolute z-10 border ${!dropdownOpen ? "hidden" : ""} bg-white bg-opacity-100 rounded mt-2 top-full`}>                    
                            <div onClick={() => addEveryoneToContribution() } className="bg-red-200 cursor-pointer hover:bg-red-300 rounded m-2 px-2 py-2">Everyone</div>
                            {state?.people.map(person => {
                                if (itemState.contributedBy.find(p => p.id === person.id)) {return ("")}
                                return (
                                    <div onClick={() => addContribution(person)} key={person.id} className="bg-red-200 cursor-pointer hover:bg-red-300 rounded m-2 px-2 py-2">{person.name}</div>
                                )
                            }
                            )}
                        </div>
                    </div>
                    )}
                        
                    </div>



                </form>
                <div className="flex space-x-4 flex-wrap">
                    {itemState.contributedBy.map(person => (
                        <div className="bg-red-300 rounded flex items-center space-x-4 px-2 py-1" key={person.id}>
                            <span>{person.name}</span>
                            <span onClick={() => removeContribution(person)} className="cursor-pointer text-red-500 hover:text-white">x</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ItemInput