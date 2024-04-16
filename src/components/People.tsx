import AddPerson from "./AddPerson"
import PersonList from "./PersonList"


const People = () => {
    return (
        <>
        <h2 className="text-3xl my-1">People</h2>
        <AddPerson />
        <PersonList />
        </>
    )
}

export default People