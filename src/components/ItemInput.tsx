import type { Item, Person } from "../types/bill"
import { useContext, useState, useEffect, useReducer } from "react"
import { StoreContext } from "../store"
import { removeItem, addItem } from "../store/actions"
import { Action } from "../types/store"
import { TextInput, Button , Dropdown } from "flowbite-react"
import { HiX } from "react-icons/hi"

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
            <div className="my-4">
                <form className="my-2" onSubmit={(e) => updateItemHandler(e)} action="">
                    <div className="flex items-center space-x-4">
                        <TextInput step={0.01} value={itemState.amount || ""} onChange={(e) => updateItem({amount : +e.target.value})} placeholder="Amount" type="number" name="" id=""  />
                       
                        <TextInput value={itemState.name} onChange={(e) => updateItem({name : e.target.value})} placeholder="Item Name (Optional) " type="text" name="" id="" />
                       
                       <Button className="bg-red-400 w-8 h-8 rounded" type="button" onClick={() => removeItemHandler(props.item.id)}><HiX /></Button>
                       
                        <button type="submit"></button>
                       
                    {state && state?.people.length > 0 && (
                        <Dropdown size={"sm"} className="bg-white" label="Shared">
                            <Dropdown.Item onClick={() => addEveryoneToContribution() }>Everyone</Dropdown.Item>
                            {state?.people.map(person => {
                                if (itemState.contributedBy.find(p => p.id === person.id)) {return ("")}
                                return (
                                    <Dropdown.Item onClick={() => addContribution(person)} key={person.id}>{person.name}</Dropdown.Item>
                                )
                            }
                            )}

                        </Dropdown>
                    )}
                        
                    </div>



                </form>
                <div className="flex flex-wrap">
                    {itemState.contributedBy.map(person => (
                        <div className="bg-red-300 my-2 mr-2 rounded items-center flex space-x-4 px-4 py-2" key={person.id}>
                        <div>{person.name}</div>
                        <div onClick={() => removeContribution(person)} className="cursor-pointer text-gray-700  flex justify-center items-center w-6 h-6 rounded hover:bg-gray-200 hover:text-gray-900 font-bold"><HiX/></div>
                    </div>
                       
                    ))}
                </div>
            </div>
            <hr></hr>
        </>
    )
}

export default ItemInput