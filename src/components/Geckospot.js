import React, { useState } from "react"
import Dashboard from "./Dashboard"
import { Welcome } from "./welcome/Welcome"
import "./Geckospot.css"

export default () => {
    const [check, update] = useState(false)
    const toggle = () => update(!check)

    const logout = () => {
        sessionStorage.removeItem("activeUser")
        toggle()
    }

    return (
        sessionStorage.getItem("activeUser") ? <Dashboard logout={logout} /> : <Welcome toggle={toggle} />
    )
}