import React, { useContext } from "react"
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap"
import { MealContext } from "./MealProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import "./MealLog.css"

export default ({ geckoId, addMealModalToggle, setMealObjectToEdit }) => {

    const { meals, deleteMeal } = useContext(MealContext)
    const geckoMeals = meals.filter(meal => meal.geckoId === geckoId)

    geckoMeals.sort((a, b) => (a.mealDate < b.mealDate) ? 1 : (a.mealDate === b.mealDate) ? ((a.id < b.id) ? 1 : -1) : -1 )

    const mealTable = (
        <Table className="mealLog table-sm table-responsive">
                    <thead>
                        <tr>
                            <th className="align-middle border-top-0 pr-3">Date</th>
                            <th className="align-middle w-100 border-top-0">Meal</th>
                            <th className="align-middle text-center border-top-0 px-3">Qty</th>
                            <th className="text-center highlight border"><small>Calcium</small></th>
                            <th className="text-center highlight border"><small>D3</small></th>
                            <th className="text-center highlight border"><small>Multi</small></th>
                            <th className="text-nowrap border-top-0"></th>
                        </tr>
                    </thead>
                    <tbody>
                {geckoMeals.map(meal => {
                    return (
                        
                            <tr key={"mealrow"+meal.id}>
                                <td className="align-middle">{timestampToDateString(meal.mealDate)}</td>
                                <td className="align-middle">{meal.mealType}</td>
                                <td className="text-center align-middle">{meal.quantity}</td>
                                <td className="text-center highlight border align-middle">{meal.calciumSupplement === true ? "✔" : ""}</td>
                                <td className="text-center highlight border align-middle">{meal.d3Supplement === true ? "✔" : ""}</td>
                                <td className="text-center highlight border align-middle">{meal.multivitaminSupplement === true ? "✔" : ""}</td>
                                <td className="text-right">
                                    <div className="text-nowrap">
                                        <Button
                                    className="btn-sm m-1"
                                    color="info"
                                    onClick={() => {
                                        setMealObjectToEdit(meal)
                                        addMealModalToggle()
                                        }
                                    }
                                    >edit</Button>
                                    <Button 
                                        className="btn-sm"
                                        color="danger"
                                        onClick={() => deleteMeal(meal.id)}
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
        <Card>
            <CardHeader className="align-middle">
                Meal Log
                <Button 
                    color="primary"
                    className="btn-sm float-right"
                    onClick={addMealModalToggle}
                    >
                        Add New Meal
                </Button>
            </CardHeader>
            <CardBody>
                {geckoMeals.length > 0 ? mealTable : "You have not logged any meals for this gecko yet."}
            </CardBody>
        </Card>
    )
}