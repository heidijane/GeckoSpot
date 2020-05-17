import React, { useState, useEffect } from "react"

export const WeightContext = React.createContext()

export const WeightProvider = (props) => {
    const [weights, setWeights] = useState([])

    const getWeights = () => {
        return fetch("http://localhost:8088/geckoWeights?deleted=false")
            .then(res => res.json())
            .then(setWeights)
    }

    const addWeight = weight => {
        return fetch("http://localhost:8088/geckoWeights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(weight)
        })
            .then(_ => _.json())
            .then(weight => {
                getWeights()
                return weight.id
             })
    }

    const deleteWeight = weightId => {
        return fetch(`http://localhost:8088/geckoWeights/${weightId}`, {
            method: "PATCH",
                body: JSON.stringify({
                    deleted: true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(getWeights)
    }

    useEffect(() => {
        getWeights()
    }, [])

    useEffect(() => {
        console.log("****  WEIGHT LOG APPLICATION STATE CHANGED  ****")
    }, [weights])

    return (
        <WeightContext.Provider value={{
            weights, addWeight, deleteWeight
        }}>
            {props.children}
        </WeightContext.Provider>
    )
}