import React, { useContext } from "react"
import { Button, Badge } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import ImageThumbList from "../images/ImageThumbList"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "./MarketplaceProvider"

export default ({ geckoId}) => {

    const { geckos } = useContext(GeckoContext)
    const { users } = useContext(UserContext)
    const { listings, addPurchaseInquiry } = useContext(ListingContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

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

    //get seller's info
    const sellerObj = users.find(user => user.id === currentGecko.userId)

    //get listing for gecko
    const listing = listings.find(listing => listing.geckoId === geckoId)

    //add a new purchase inquiry
    const createInquiry = () => {
        addPurchaseInquiry({
            marketplaceId: listing.id,
            buyerId: currentUserId,
            transactionComplete: false,
            purchased: false //changes to true if this user is the one who ends up purchasing the gecko
        }).then(window.alert(`${sellerObj.username} has been contacted regarding your interest!They will reach out to you via e-mail shortly.`))
    }

    //make sure that user can't make an inquiry twice
    let alreadyInterested = false
    if (listing.marketplaceBuyers.some(inquiry => inquiry.buyerId === currentUserId)) {
        alreadyInterested = true
    }

    

    return (
        <section>
            <div className="text-right mt-2 imageList">
                <ImageThumbList geckoId={geckoId} currentUser={false} />
            </div>
            <div className="d-flex justify-content-start align-items-center">
                <h1>{currentGecko.name}</h1>
                <div className="pricetag larger">
                    <div className="pricetag_left"></div>
                    <div className="pricetag_right larger">${listing.price}</div>
                </div>
            </div>
            {currentGeckoMorph.colorMorph !== "" ? <Badge className="mr-1">{currentGeckoMorph.colorMorph}</Badge> : ""}
            {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{currentGeckoMorph.eyeMorph}</Badge> : ""}
            {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
        
            <div><h5>Sold by {sellerObj.username}</h5></div>
            <div><h5>Listed on {timestampToDateString(listing.listingDate)}</h5></div>
            <div className="geckoDetails__hatchDateAndSex">
                    <div className="geckoDetails__hatchDate"><img src={require("../../images/icon_hatch.png")} alt="hatch date" title="hatch date" />{currentGecko.hatchDate !== null ? timestampToDateString(currentGecko.hatchDate) : "unknown"}</div>
                    <div className="geckoDetails__sex">{currentGecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" /> : <img src={require("../../images/icon_male.png")} alt="male" />}</div>
            </div>
            <div>{listing.listingNotes}</div>
            <hr />
            <div className="text-right">
                {alreadyInterested === true ? (
                    <Button disabled={true}>Already Submitted Interest</Button>
                ) : (
                    <Button 
                    color="primary"
                    onClick={createInquiry}
                >I'm Interested!</Button>
                )}
            </div>
        </section>
    )
}