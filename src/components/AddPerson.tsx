
import React, { useContext, useState } from "react"
import { StoreContext } from "../store"
import { getUniqueId } from "../helpers"
import { addPerson } from "../store/actions"
import { TextInput, Button } from "flowbite-react"


const AddPerson = () => {
    const [name, setName] = useState("")
    const [state, dispatch] = useContext(StoreContext)
    function onSubmitHandler(e: React.FormEvent) {
        e.preventDefault()
        if (name === '') return
        if (state?.people.find(person => person.name.toLowerCase() === name.toLowerCase())) { return }
        const id = getUniqueId()
        const newPerson = {
            name, id
        }
        if (typeof (dispatch) === 'function') {
            dispatch(addPerson(newPerson))
        }
        setName("")
    }

    return (
        <>
            <p className="my-2">Add the people involved in this bill.</p>
            <form className="my-4" onSubmit={e => onSubmitHandler(e)} action="">
                <div className="flex items-center space-x-4">
                    <TextInput placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </>
    )
}

export default AddPerson