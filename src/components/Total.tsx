import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../store"
import { Table } from "flowbite-react"

interface TotalShare {
    [key: string]: number
}

const Total = () => {
    const [state, _] = useContext(StoreContext)
    const [totalShare, setTotalShare] = useState<TotalShare>({})

    useEffect(() => {
        console.log(state)
        function calculate() {
            const newTotalShare: TotalShare = {}
            const items = state?.items
            items?.forEach(item => {
                if (item.contributedBy.length > 0) {
                    const share = item.amount / item.contributedBy.length
                    item.contributedBy.forEach(person => {
                        if (person.name in newTotalShare) {
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
        <div className="p-4">
            <div className="flex justify-between p-4">
                <h1 className="text-xl font-bold">Bill Breakdown</h1>
            </div>
            <div className="p-4">
                <Table>
                    <Table.Head>

                        <Table.HeadCell>Person</Table.HeadCell>
                        <Table.HeadCell>Total</Table.HeadCell>



                    </Table.Head>
                    <Table.Body>
                        {Object.keys(totalShare).filter(name => totalShare[name] > 0).map(name => (
                            <Table.Row key={name}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>₹{totalShare[name].toFixed(2)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div className="flex p-4">
                <div className="font-bold">
                    Bill Total: ₹{Object.keys(totalShare).reduce((prev, key) => totalShare[key] + prev, 0).toFixed(2)}
                </div>
            </div>
        </div>

    )
}

export default Total