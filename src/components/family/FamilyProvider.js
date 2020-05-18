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

    const updateParent = rel => {
        return fetch(`http://localhost:8088/geckoParents/${rel.id}`, {
            method: "PATCH",
                body: JSON.stringify({
                    parentId: rel.parentId
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
        console.log("****  PARENT LOG APPLICATION STATE CHANGED  ****")
    }, [parents])

    return (
        <FamilyContext.Provider value={{
            parents, addParent, updateParent
        }}>
            {props.children}
        </FamilyContext.Provider>
    )
}