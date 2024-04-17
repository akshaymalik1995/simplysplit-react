import AddPerson from "./AddPerson"
import PersonList from "./PersonList"


const People = () => {
    return (
        <>
        <div className="">
        <h2 className="text-3xl my-2">People</h2>
        <AddPerson />
        <PersonList />
        </div>
        
        </>
    )
}

export default People