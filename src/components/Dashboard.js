/*
    Dashboard.js
    Determines which part of the app is shown to the user

    Possible page states:
    - myGeckos: "home" page once a user is logged in, shows an overview of all their geckos
    - geckoDetails: detailed information page on one gecko
    - marketplace: area where users can see list of geckos for sale
*/

import React, { useState, useEffect } from "react"
import MyGeckos from "./geckos/MyGeckos"
import Marketplace from "./marketplace/Marketplace"
import NavBar from "./nav/NavBar"

export default () => {
    const [pageState, setPageState] = useState("myGeckos")
    const [components, setComponents] = useState()

    const showMyGeckos = () => <MyGeckos />
    const showMarketplace = () => <Marketplace />

    useEffect(() => {
        if (pageState === "myGeckos") {
            setComponents(showMyGeckos)
        } else if (pageState === "marketplace") {
            setComponents(showMarketplace)
        }
    }, [pageState])

    return (
        <>
            <NavBar setPageState={setPageState} />
            <div>{components}</div>
        </>
        )
}



