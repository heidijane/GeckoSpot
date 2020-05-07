import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users?_embed=userMorphs")
            .then(res => res.json())
            .then(setUsers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log("****  USER APPLICATION STATE CHANGED  ****")
    }, [users])

    return (
        <UserContext.Provider value={{
            users
        }}>
            {props.children}
        </UserContext.Provider>
    )
}