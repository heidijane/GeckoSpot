/*
    Dashboard.js
    Determines which part of the app is shown to the user

    Possible page states:
    - geckoList
    - geckoDetails
    - marketplace
*/

import React, { useState, useEffect } from "react"
import GeckoList from "./geckos/GeckoList"

export default ({toggle}) => {
    const [pageState, setPageState] = useState("geckoList")
    const [components, setComponents] = useState()

    const showGeckoList = () => <GeckoList />

    useEffect(() => {
        if (pageState === "geckoList") {
            setComponents(showGeckoList)
        }
    }, [pageState])

    return (
        <div>{components}</div>
        )
}



