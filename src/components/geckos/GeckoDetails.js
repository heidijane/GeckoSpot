import React, { useContext } from "react"
import { GeckoContext } from "./GeckoProvider"
import "./GeckoDetails.css"
import { Button, Badge } from "reactstrap"

export default ( {geckoId} ) => {

    const { geckos } = useContext(GeckoContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const currentGecko = geckos.find(gecko => gecko.id === geckoId)
    let currentGeckoMorph = currentGecko.geckoMorphs[0]
    if (currentGeckoMorph === undefined) {
        currentGeckoMorph = {
            colorMorph: "",
            eyeMorph: "",
            sizeMorph: ""
        }
    }

    return (
    <article className="geckoDetails">
        <section className="geckoDetails__leftColumn">
            <img src={require("../images/sample.gif")} className="featuredImage" />
            <div><h1>{currentGecko.name}</h1></div>
            <div>
                <div>{currentGecko.hatchDate}</div>
                <div>{currentGecko.sex === 0 ? "♀" : "♂"}</div>
            </div>
            <div>{currentGecko.profile}</div>
                {currentGeckoMorph.colorMorph !== "" ? <Badge>{currentGeckoMorph.colorMorph}</Badge> : ""}
                {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.eyeMorph}</Badge> : ""}
                {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
            <div className="text-right"><Button className="btn-sm">Change Info</Button></div>
        </section>
        <section className="geckoDetails__rightColumn">
            right column
        </section>
    </article>)
}