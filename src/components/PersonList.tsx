
import { useContext } from "react";
import { StoreContext } from "../store";
import { removePerson } from "../store/actions";
import { HiX } from "react-icons/hi"
const PersonList = () => {
    const [state, dispatch] = useContext(StoreContext);
    
    function remove(id : string){
        if (typeof(dispatch) === 'function'){
            dispatch(removePerson(id))
        }
    }

    return (
        <>
            <div className="flex flex-wrap">
                {state?.people.map(person => (
                    <div className="bg-red-300 my-2 mr-2 rounded items-center flex space-x-4 px-4 py-2" key={person.id}>
                        <div>{person.name}</div>
                        <div onClick={() => remove(person.id)} className="cursor-pointer text-gray-700  flex justify-center items-center w-6 h-6 rounded hover:bg-gray-100 hover:text-gray-900 font-bold"><HiX/></div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default PersonList
