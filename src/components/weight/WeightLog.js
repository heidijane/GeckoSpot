import React, { useContext } from "react"
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap"
import { WeightContext } from "./WeightProvider"
import { timestampToDateString } from "../../utilities/timestampToString"

export default ({ geckoId }) => {

    const { weights, deleteWeight } = useContext(WeightContext)
    const geckoWeights = weights.filter(weight => weight.geckoId === geckoId)

    geckoWeights.sort((a, b) => (a.weighDate > b.weighDate) ? 1 : (a.weighDate === b.weighDate) ? ((a.id > b.id) ? 1 : -1) : -1 )

    const weightTable = (
        <Table className="mealLog table-sm table-responsive">
                    <thead>
                        <tr>
                            <th className="align-middle border-top-0 pr-3">Date</th>
                            <th className="align-middle w-100 border-top-0">Meal</th>
                            <th className="text-nowrap border-top-0"></th>
                        </tr>
                    </thead>
                    <tbody>
                {geckoWeights.map(weight => {
                    return (
                        
                            <tr key={"weightrow"+weight.id}>
                                <td className="align-middle">{timestampToDateString(weight.weighDate)}</td>
                                <td className="align-middle">{weight.weight} grams</td>
                                <td className="text-right">
                                    <div className="text-nowrap">
                                    <Button 
                                        className="btn-sm"
                                        color="danger"
                                        onClick={() => deleteWeight(weight.id)}
                                    >delete</Button>
                                    </div>
                                </td>
                            </tr>
                        
                    )
                })}
                </tbody>
                </Table>
    )

    return (
        <Card className="mt-3">
            <CardHeader className="align-middle">
                Weight Log
                <Button 
                    color="primary"
                    className="btn-sm float-right"
                    // onClick={addMealModalToggle}
                    >
                        Log Weight
                </Button>
            </CardHeader>
            <CardBody>
                {geckoWeights.length > 0 ? weightTable : "You have not logged your gecko's weight yet."}
            </CardBody>
        </Card>
    )
}