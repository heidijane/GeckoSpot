import React, { useContext } from "react"
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap"
import { MealContext } from "./MealProvider"
import { timestampToDateString } from "../../utilities/timestampToString"

export default ({ geckoId, addMealModalToggle, setMealObjectToEdit }) => {

    const { meals, deleteMeal } = useContext(MealContext)
    const geckoMeals = meals.filter(meal => meal.geckoId === geckoId)

    geckoMeals.sort((a, b) => (a.mealDate > b.mealDate) ? 1 : -1)

    return (
        <Card>
            <CardHeader>
                Meal Log
                <Button 
                    color="primary"
                    className="btn-sm"
                    onClick={addMealModalToggle}
                    >
                        Add New Meal
                </Button>
            </CardHeader>
            <CardBody>
                <Table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Feeder</td>
                            <td>Qty.</td>
                            <td>Calcium</td>
                            <td>d3</td>
                            <td>Multi.</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                {geckoMeals.map(meal => {
                    return (
                        
                            <tr key={"mealrow"+meal.id}>
                                <td>{timestampToDateString(meal.mealDate)}</td>
                                <td>{meal.mealType}</td>
                                <td>{meal.quantity}</td>
                                <td>{meal.calciumSupplement === true ? "✔" : ""}</td>
                                <td>{meal.d3Supplement === true ? "✔" : ""}</td>
                                <td>{meal.multivitaminSupplement === true ? "✔" : ""}</td>
                                <td>
                                    <Button
                                    className="btn-sm"
                                    onClick={() => {
                                        setMealObjectToEdit(meal)
                                        addMealModalToggle()
                                        }
                                    }
                                    >edit</Button>
                                    <Button 
                                        className="btn-sm"
                                        onClick={() => deleteMeal(meal.id)}
                                    >delete</Button>
                                </td>
                            </tr>
                        
                    )
                })}
                </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}