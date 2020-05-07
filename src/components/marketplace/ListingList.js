import React, { useContext } from "react"
import { GeckoContext } from "../geckos/GeckoProvider"
import { Card, CardImg, CardTitle, CardText, Badge } from "reactstrap"
import "../geckos/GeckoList.css"
import { ImageContext } from "../images/ImageProvider"
import { ListingContext } from "./MarketplaceProvider"
import "./PriceTag.css"

export default () => {

    const { geckos } = useContext(GeckoContext)
    const { listings } = useContext(ListingContext)
    const { images } = useContext(ImageContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    if (listings.length > 0) {
        return (
            <section className="geckoList">
                {listings.map(listing => {
                    //get gecko info for the listing
                    const gecko = geckos.find(gecko => gecko.id === listing.geckoId)

                    //get featured image for gecko
                    const featuredImage = images.find(image => image.id === gecko.imageId)

                    //get morph info if available
                    let geckoMorph = {}
                    if (gecko.geckoMorphs[0] === undefined) {
                        geckoMorph = {
                            id: null,
                            geckoId: gecko.id,
                            colorMorph: "",
                            eyeMorph: "",
                            sizeMorph: ""
                        }
                    } else {
                        geckoMorph = gecko.geckoMorphs[0]
                    }

                    return (
                        <Card 
                            key={"gecko_"+gecko.id}
                            className="geckoCard shadow-sm"
                            >
                            {gecko.imageId === 0 || gecko.imageId === null ? (
                                <div className="featuredImage featuredImage_placeholder"></div>
                            ): (
                                <CardImg top width="100%" src={featuredImage.imageURL} />
                            )}                            
                            <CardTitle className="geckoCard__title">{gecko.name}</CardTitle>
                            <div>
                                <div>
                                    {geckoMorph.colorMorph !== "" ? <Badge className="mr-1">{geckoMorph.colorMorph}</Badge> : ""}
                                    {geckoMorph.eyeMorph !== "" && geckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{geckoMorph.eyeMorph}</Badge> : ""}
                                    {geckoMorph.sizeMorph !== "" && geckoMorph.sizeMorph !== "Normal" ? <Badge>{geckoMorph.sizeMorph}</Badge> : ""}
                                </div>
                                <div className="pricetag">
                                    <div className="pricetag_left"></div>
                            <div className="pricetag_right">${listing.price}</div>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </section>
            )
    } else {
        return (<section className="geckoList">There are no geckos up for sale at the moment.</section>)
    }

    
}