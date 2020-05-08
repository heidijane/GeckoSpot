import React, { useState, useEffect } from "react"

export const MealContext = React.createContext()

export const MealProvider = (props) => {
    const [meals, setMeals] = useState([])

    const getMeals = () => {
        return fetch("http://localhost:8088/geckoMeals?deleted=false")
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
            method: "PATCH",
                body: JSON.stringify({
                    deleted: true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(getMeals)
    }

    const updateMeal = meal => {
        return fetch(`http://localhost:8088/geckoMeals/${meal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
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
            meals, addMeal, deleteMeal, updateMeal
        }}>
            {props.children}
        </MealContext.Provider>
    )
}