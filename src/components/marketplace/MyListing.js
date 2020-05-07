import React, { useContext } from "react"
import SellGeckoForm from "./SellGeckoForm"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "./MarketplaceProvider"
import { GeckoContext } from "../geckos/GeckoProvider"
import { Button } from "reactstrap"

export default ( {geckoId, toggle} ) => {

    const { geckos } = useContext(GeckoContext)
    const { users } = useContext(UserContext)
    const { listings, deleteListing } = useContext(ListingContext)

    //get listing for gecko
    const listing = listings.find(listing => listing.geckoId === geckoId)

    return (
        <>
        <SellGeckoForm geckoId={geckoId} editListingObject={listing} />
        <hr />
        Potential Buyers
        <hr />
        <div className="text-right">
            <Button 
                color="danger"
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this listing?")) {
                        toggle()
                        deleteListing(listing.id)
                    }
                }}
            >Delete Listing</Button>
        </div>
        </>
    )
}