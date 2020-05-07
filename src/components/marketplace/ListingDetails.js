import React, { useContext } from "react"
import { Button, Badge } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ImageContext } from "../images/ImageProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import ImageThumbList from "../images/ImageThumbList"

export default ({ geckoId}) => {

    const { geckos } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)

    const currentGecko = geckos.find(gecko => gecko.id === geckoId)
    let currentGeckoMorph = {}
    if (currentGecko.geckoMorphs[0] === undefined) {
        currentGeckoMorph = {
            id: null,
            geckoId: geckoId,
            colorMorph: "",
            eyeMorph: "",
            sizeMorph: ""
        }
    } else {
        currentGeckoMorph = currentGecko.geckoMorphs[0]
    }

    //get featured image info
    const featuredImage = images.find(image => image.id === currentGecko.imageId)

    return (
        <section>
                <div className="text-right mt-2 imageList">
                    <ImageThumbList geckoId={geckoId} currentUser={false} />
                </div>
            <div><h1>{currentGecko.name}</h1></div>
            <div className="geckoDetails__hatchDateAndSex">
                    <div className="geckoDetails__hatchDate"><img src={require("../../images/icon_hatch.png")} alt="hatch date" title="hatch date" />{currentGecko.hatchDate !== null ? timestampToDateString(currentGecko.hatchDate) : "unknown"}</div>
                    <div className="geckoDetails__sex">{currentGecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" /> : <img src={require("../../images/icon_male.png")} alt="male" />}</div>
            </div>
            <div>{currentGecko.profile}</div>
            {currentGeckoMorph.colorMorph !== "" ? <Badge className="mr-1">{currentGeckoMorph.colorMorph}</Badge> : ""}
            {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{currentGeckoMorph.eyeMorph}</Badge> : ""}
            {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
            
        </section>
    )
}