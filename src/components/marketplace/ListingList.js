import React, { useContext } from "react"
import { GeckoContext } from "../geckos/GeckoProvider"
import { Card, CardImg, CardTitle, CardText } from "reactstrap"
import "../geckos/GeckoList.css"
import { ImageContext } from "../images/ImageProvider"
import { ListingContext } from "./MarketplaceProvider"

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
                        </Card>
                    )
                })}
            </section>
            )
    } else {
        return (<section className="geckoList">There are no geckos up for sale at the moment.</section>)
    }

    
}