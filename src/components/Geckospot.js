import React, { useState } from "react"
import Dashboard from "./Dashboard"
import { Welcome } from "./welcome/Welcome"
import "./Geckospot.css"

export default () => {
    const [check, update] = useState(false)
    const toggle = () => update(!check)

    return (
        sessionStorage.getItem("activeUser") ? <Dashboard /> : <Welcome toggle={toggle} />
    )
}