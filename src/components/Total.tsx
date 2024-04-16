import { useContext, useEffect, useState } from "react"
import {StoreContext} from "../store"

interface TotalShare {
    [key : string] : number
}

const Total = () => {
    const [state, _] = useContext(StoreContext)
    const [totalShare , setTotalShare] = useState<TotalShare>({})

    useEffect(() => {
        console.log(state)
        function calculate(){
            const newTotalShare : TotalShare = {}
            const items = state?.items
            items?.forEach(item => {
                if (item.contributedBy.length > 0){
                    const share = item.amount / item.contributedBy.length
                    item.contributedBy.forEach(person => {
                        if (person.name in newTotalShare){
                            newTotalShare[person.name] += share
                        } else {
                            newTotalShare[person.name] = share
                        }
                    })
                }
            })
            setTotalShare(newTotalShare)
        }
        calculate()
    }, [state])

   

    return (
        <div className="border p-4">
            <div className="flex justify-between p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Bill Breakdown</h1>
            </div>
            <div className="p-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left border-b border-gray-200">
                            <th className="p-2">Person</th>
                            <th className="p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(totalShare).map(name => (
                            <tr key={name} className="border-b border-gray-200">
                            <td className="p-2">{name}</td>
                            <td className="p-2">₹{totalShare[name].toFixed(2)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end p-4">
                <div className="text-right font-bold">
                    Bill Total: ₹{Object.keys(totalShare).reduce((prev, key) => totalShare[key] + prev , 0).toFixed(2)}
                </div>
            </div>
        </div>

    )
}

export default Total