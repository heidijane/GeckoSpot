import React, { useContext } from "react"
import { Button, Badge, CardFooter } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import ImageThumbList from "../images/ImageThumbList"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "./MarketplaceProvider"
import FamilyTree from "../family/FamilyTree"

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
            <div className="text-center mt-2 imageList">
                <ImageThumbList geckoId={geckoId} currentUser={false} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mr-1">{currentGecko.name}</h2>
                <h3>{currentGecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" className="genderIcon" /> : <img src={require("../../images/icon_male.png")} alt="female" className="genderIcon" />}</h3>
                <div className="pricetag larger ml-auto">
                    <div className="pricetag_left"></div>
                    <div className="pricetag_right larger">${listing.price}</div>
                </div>
                </div>
            <h5 className="mt-n3">
            {currentGeckoMorph.colorMorph !== "" ? <Badge className="mr-1">{currentGeckoMorph.colorMorph}</Badge> : ""}
            {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{currentGeckoMorph.eyeMorph}</Badge> : ""}
            {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
            </h5>

            <div className="section">
                <div className="section_header">Seller</div>
                <h5>{sellerObj.username}</h5>
            </div>

            <div className="section">
                <div className="section_header">List Date</div>
                <h5>{timestampToDateString(listing.listingDate)}</h5>
            </div>

            <div className="section">
                <div className="section_header">Hatch Date</div>
                <h5>{currentGecko.hatchDate !== null ? timestampToDateString(currentGecko.hatchDate) : "unknown"}</h5>
            </div>

            <div className="section">
                <div className="section_header">Notes</div>
                <div>{listing.listingNotes !== "" ? listing.listingNotes : <span className="font-italic">None</span>}</div>
            </div>

            <div className="section">
                <div className="section_header">Family</div>
                <div><FamilyTree geckoId={listing.geckoId} /></div>
            </div>
            
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