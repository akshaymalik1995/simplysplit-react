
import React , {useContext} from "react"
import { StoreContext } from "../store"
import { getUniqueId } from "../helpers"
import { addPerson} from "../store/actions"

const AddPerson = () => {
    
    const [state, dispatch ] = useContext(StoreContext)
    function onSubmitHandler(e : React.FormEvent){
        e.preventDefault()
        const form : EventTarget | null = e.target
        if (form instanceof HTMLFormElement){
            const nameInputElement : HTMLInputElement = form.elements.namedItem("name") as HTMLInputElement
            const name : string = nameInputElement.value
            if (name === '') return
            if (state?.people.find(person => person.name.toLowerCase() === name.toLowerCase())){return}
            const id = getUniqueId()
            const newPerson = {
                name, id
            }
            if (typeof(dispatch) === 'function'){
                dispatch(addPerson(newPerson))
            }
            form.reset()
        }
        
        
    }

    
    return (
        <>
        <p className="my-1">Add the people involved in this bill.</p>
        <form onSubmit={e => onSubmitHandler(e)}   action="">
            <div className="flex items-center space-x-4">
            <input className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="name" type="text" />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add </button>
            </div>
            
        </form>
        </>
    )
}

export default AddPerson