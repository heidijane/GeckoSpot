import React, { useState, useEffect } from "react"

export const MealContext = React.createContext()

export const MealProvider = (props) => {
    const [meals, setMeals] = useState([])

    const getMeals = () => {
        return fetch("http://localhost:8088/geckoMeals")
            .then(res => res.json())
            .then(setMeals)
    }

    const addMeal = meal => {
        return fetch("http://localhost:8088/geckoMeals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
        })
            .then(_ => _.json())
            .then(meal => {
                getMeals()
                return meal.id
             })
    }

    const deleteMeal = mealId => {
        return fetch(`http://localhost:8088/geckoMeals/${mealId}`, {
            method: "DELETE"
        })
            .then(getMeals)
    }

    useEffect(() => {
        getMeals()
    }, [])

    useEffect(() => {
        console.log("****  MEAL LOG APPLICATION STATE CHANGED  ****")
    }, [meals])

    return (
        <MealContext.Provider value={{
            meals, addMeal, deleteMeal
        }}>
            {props.children}
        </MealContext.Provider>
    )
}