import React, { useState, useEffect } from "react"

export const FamilyContext = React.createContext()

export const FamilyProvider = (props) => {
    const [parents, setParents] = useState([])

    const getParents = () => {
        return fetch("http://localhost:8088/geckoParents?deleted=false")
            .then(res => res.json())
            .then(setParents)
    }

    const addParent = parent => {
        return fetch("http://localhost:8088/geckoParents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parent)
        })
            .then(_ => _.json())
            .then(parent => {
                getParents()
                return parent.id
             })
    }

    const deleteParent = parentId => {
        return fetch(`http://localhost:8088/geckoParents/${parentId}`, {
            method: "PATCH",
                body: JSON.stringify({
                    deleted: true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(getParents)
    }

    useEffect(() => {
        getParents()
    }, [])

    useEffect(() => {
        console.log("****  WEIGHT LOG APPLICATION STATE CHANGED  ****")
    }, [parents])

    return (
        <FamilyContext.Provider value={{
            parents, addParent, deleteParent
        }}>
            {props.children}
        </FamilyContext.Provider>
    )
}