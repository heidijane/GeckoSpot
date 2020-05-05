import React, { useState, useEffect } from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import "./Auth.css"

export const Auth = ({toggle}) => {
    const [authPageState, setAuthPageState] = useState("login")
    const [components, setComponents] = useState()

    const showLogin = () => <Login setState={setAuthPageState} toggle={toggle} />
    const showRegister = () => <Register setState={setAuthPageState}  />

    useEffect(() => {
        if (authPageState === "login") {
            setComponents(showLogin)
        } else {
            setComponents(showRegister)
        }
    }, [authPageState])

    return (
        <>
            {components}
        </>
    )
}
