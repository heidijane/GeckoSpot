import React, { useContext } from "react"
import { GeckoContext } from "./GeckoProvider"
import "./GeckoDetails.css"

export default ( {geckoId} ) => {

    const { geckos } = useContext(GeckoContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const currentGecko = geckos.find(gecko => gecko.id === geckoId)

    return (
    <article className="geckoDetails">
        <section className="geckoDetails__leftColumn">
            left column
        </section>
        <section className="geckoDetails__rightColumn">
            right column
        </section>
    </article>)
}