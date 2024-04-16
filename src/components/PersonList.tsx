
import { useContext } from "react";
import { StoreContext } from "../store";
import { removePerson } from "../store/actions";
const PersonList = () => {
    const [state, dispatch] = useContext(StoreContext);
    
    function remove(id : string){
        if (typeof(dispatch) === 'function'){
            dispatch(removePerson(id))
        }
    }

    return (
        <>
            <div className="flex flex-wrap space-x-4">
                {state?.people.map(person => (
                    <div className="bg-red-300 rounded flex items-center space-x-2 px-2 py-1" key={person.id}>
                        <span>{person.name}</span>
                        <span onClick={() => remove(person.id)} className="cursor-pointer text-red-500 hover:text-white">x</span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default PersonList
