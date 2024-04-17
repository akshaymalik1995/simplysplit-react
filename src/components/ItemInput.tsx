import type { Item, Person } from "../types/bill"
import { useContext, useEffect, useReducer } from "react"
import { StoreContext } from "../store"
import { removeItem, addItem } from "../store/actions"
import { Action } from "../types/store"
import { TextInput, Button, Dropdown, Checkbox, Label } from "flowbite-react"
import { HiX } from "react-icons/hi"

// Writing a reducer function to keep track of the item state instead of useState

const updateItemAction = (payload: object) => {
    return {
        type: "UPDATE",
        payload: payload
    }
}

const itemReducer = (state: Item, action: Action) => {
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
    const item: Item = props.item
    const [state, dispatch] = useContext(StoreContext)
    const [itemState, itemDispatch] = useReducer<React.Reducer<Item, Action>>(itemReducer, item)
    function removeItemHandler(id: string) {
        if (typeof (dispatch) === 'function') {
            dispatch(removeItem(id))
        }
    }

    useEffect(() => {
        itemDispatch(updateItemAction({ contributedBy: [...itemState.contributedBy.filter(p => state?.people.find(person => person.id === p.id))], paidBy : state?.people.find(person => person.id === item.paidBy?.id ) ? item.paidBy : null}))
    }, [state?.people])

    useEffect(() => {
        if (typeof dispatch === 'function') {
            dispatch(addItem(itemState))
        }
    }, [itemState])


    function updateItem(payload: object) {
        itemDispatch(updateItemAction(payload))
    }

    function updateItemHandler(e: React.FormEvent) {
        e.preventDefault()
    }

    function addEveryoneToContribution() {
        if (state) {
            itemDispatch(updateItemAction({ contributedBy: [...state.people] }))
        }
    }
    function removeEveryoneFromContribution() {
        if (state) {
            itemDispatch(updateItemAction({ contributedBy: [] }))
        }
    }

    function addPaidBy(person : Person){
        if (state) {
            itemDispatch(updateItemAction({ paidBy: person }))
        }
    }

    function removePaidBy(){
        if (state) {
            itemDispatch(updateItemAction({ paidBy: null }))
        }
    }

    function addContribution(person: Person) {
        // Check if the person is already in the list
        const personExists = itemState.contributedBy.find(p => p.id === person.id)
        if (personExists) { return }
        itemDispatch(updateItemAction({ contributedBy: [...itemState.contributedBy, person] }))
    }
    function removeContribution(person: Person) {
        itemDispatch(updateItemAction({ contributedBy: [...itemState.contributedBy.filter(p => p.id !== person.id)] }))
    }






    return (
        <>
            <div className="my-4">
                <form className="my-2" onSubmit={(e) => updateItemHandler(e)} action="">
                    <div className="flex flex-wrap items-center gap-4">
                        <TextInput step={0.01} value={itemState.amount || ""} onChange={(e) => updateItem({ amount: +e.target.value })} placeholder="Amount" type="number" name="" id="" />

                        <TextInput value={itemState.name} onChange={(e) => updateItem({ name: e.target.value })} placeholder="Item Name (Optional) " type="text" name="" id="" />

                        <Button className="bg-red-400 w-8 h-8 rounded" type="button" onClick={() => removeItemHandler(props.item.id)}><HiX /></Button>

                        <button type="submit"></button>
                        {state && state?.people.length > 0 && (
                            <Dropdown dismissOnClick={false} size={"sm"} className="bg-white" label="Paid">
                                {state?.people.map(person => {
                                    return (
                                        <Dropdown.Item className="flex items-center gap-2 cursor-pointer" key={person.id}>
                                            <Checkbox className="cursor-pointer" checked={itemState.paidBy?.id === person.id} onChange={e => e.target.checked ? addPaidBy(person) : removePaidBy()} id={person.name} />
                                            <Label className="cursor-pointer" htmlFor={person.name}>{person.name}</Label>
                                        </Dropdown.Item>

                                    )
                                })}
                            </Dropdown>
                        )}


                        {state && state?.people.length > 0 && (
                            <Dropdown dismissOnClick={false} size={"sm"} className="bg-white" label="Shared">
                                <Dropdown.Item className="flex gap-2 " >
                                    <Checkbox className="cursor-pointer" checked={state?.people.length === itemState.contributedBy.length} onChange={(e) => e.target.checked ? addEveryoneToContribution() : removeEveryoneFromContribution()} id="everyone" />
                                    <Label className="cursor-pointer" htmlFor="everyone">Everone</Label>
                                </Dropdown.Item>
                                {state?.people.map(person => {
                                    return (
                                        <Dropdown.Item className="flex items-center gap-2 cursor-pointer" key={person.id}>
                                            <Checkbox className="cursor-pointer" checked={itemState.contributedBy.find(p => p.id === person.id) ? true : false} onChange={e => e.target.checked ? addContribution(person) : removeContribution(person)} id={person.name} />
                                            <Label className="cursor-pointer" htmlFor={person.name}>{person.name}</Label>
                                        </Dropdown.Item>

                                    )
                                }
                                )}

                            </Dropdown>
                        )}

                    </div>



                </form>
            </div>
            <hr></hr>
        </>
    )
}

export default ItemInput