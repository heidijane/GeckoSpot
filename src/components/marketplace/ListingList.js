import React, { useContext } from "react"
import { GeckoContext } from "../geckos/GeckoProvider"
import { Card, CardImg, CardTitle, Badge } from "reactstrap"
import "../geckos/GeckoList.css"
import { ImageContext } from "../images/ImageProvider"
import "./PriceTag.css"
import { truncate } from "../../utilities/truncate"

export default ( {listings, setGeckoDetailId, myListingModal, listingDetailsModal}) => {

    const { geckos } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    if (listings.length > 0) {
        return (
            <section className="geckoList page_container">
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
                            onClick={() => {
                                setGeckoDetailId(gecko.id)
                                if(currentUserId === gecko.userId) {
                                    myListingModal()
                                } else {
                                    listingDetailsModal()
                                }
                            }
                            }
                            >
                            {gecko.imageId === 0 || gecko.imageId === null ? (
                                <div className="featuredImage featuredImage_placeholder"></div>
                            ): (
                                <CardImg top width="100%" src={featuredImage.imageURL} className="geckoCard__image" />
                            )}                            
                            <CardTitle className="geckoCard__title d-flex justify-content-between mx-2"><div>{gecko.name}</div> <div>{gecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" className="genderIcon" /> : <img src={require("../../images/icon_male.png")} alt="male" className="genderIcon" />}</div></CardTitle>
                            <div className="m-2 mt-n3">
                                <div>
                                    {geckoMorph.colorMorph !== "" ? <Badge className="mr-1">{geckoMorph.colorMorph}</Badge> : ""}
                                    {geckoMorph.eyeMorph !== "" && geckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{geckoMorph.eyeMorph}</Badge> : ""}
                                    {geckoMorph.sizeMorph !== "" && geckoMorph.sizeMorph !== "Normal" ? <Badge>{geckoMorph.sizeMorph}</Badge> : ""}
                                </div>
                                <div className="section mt-2">
                                    <div className="section_header d-inline mr-1">Notes</div>
                                    <div>{listing.listingNotes !== "" ? truncate(listing.listingNotes) : <span className="font-italic">None</span>}</div>
                                </div>
                                
                            </div>
                            <div className="pricetag">
                                    <div className="pricetag_left"></div>
                                    <div className="pricetag_right">${listing.price}</div>
                                </div>
                        </Card>
                    )
                })}
            </section>
            )
    } else {
        return (<section className="page_container">There are no geckos up for sale at the moment.</section>)
    }

    
}