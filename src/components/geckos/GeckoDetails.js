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

    const timestampToDateString = (ts) => {
        // convert unix timestamp to milliseconds
        const ts_ms = ts * 1000
        // initialize new Date object
        var date_ob = new Date(ts_ms)
        // year as 4 digits (YYYY)
        var year = date_ob.getFullYear()
        // month as 2 digits (MM)
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
        // date as 2 digits (DD)
        var date = ("0" + date_ob.getDate()).slice(-2)
        // date as YYYY-MM-DD format
        return month + "/" + date + "/" + year
    }

    return (
    <article className="geckoDetails">
        <section className="geckoDetails__leftColumn">
            <img src={require("../images/sample.gif")} className="featuredImage" />
            <div><h1>{currentGecko.name}</h1></div>
            <div className="geckoDetails__hatchDateAndSex">
                <div className="geckoDetails__hatchDate"><img src={require("../images/icon_hatch.png")} alt="hatch date" title="hatch date" />{timestampToDateString(currentGecko.hatchDate)}</div>
                <div className="geckoDetails__sex">{currentGecko.sex === 0 ? <img src={require("../images/icon_female.png")} alt="female" /> : <img src={require("../images/icon_male.png")} alt="male" />}</div>
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