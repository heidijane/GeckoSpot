import React, { useContext } from "react"
import { Card, CardHeader, CardBody, Button } from "reactstrap"
import { MealContext } from "./MealProvider"

export default ({ geckoId, addMealModalToggle }) => {

    const { meals } = useContext(MealContext)
    const geckoMeals = meals.filter(meal => meal.geckoId === geckoId)

    return (
        <Card>
            <CardHeader>
                Meal Log
                <Button 
                    color="primary"
                    className="btn-sm"
                    onClick={addMealModalToggle}>
                        Add New Meal
                </Button>
            </CardHeader>
            <CardBody>meals</CardBody>
        </Card>
    )
}