import React, { useContext, useState } from "react"
import SellGeckoForm from "./SellGeckoForm"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "./MarketplaceProvider"
import { GeckoContext } from "../geckos/GeckoProvider"
import { Button, ListGroup, ListGroupItem, Badge } from "reactstrap"
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default ( {geckoId, toggle} ) => {

    const { geckos, updateOwner } = useContext(GeckoContext)
    const { users } = useContext(UserContext)
    const { listings, deleteListing, transactionComplete } = useContext(ListingContext)

    //get listing for gecko
    const listing = listings.find(listing => listing.geckoId === geckoId)

    const buyers = listing.marketplaceBuyers

    //create state for the copy to keyboard button
    const [copied, setCopied] = useState(false)
    const [copyText, setCopyText] = useState("Copy Address")

    //function to run when user wants to close the listing and transfer ownership
    const transferOwnership = (userId) => {
        if (window.confirm("Are you sure you wish to close this listing and transfer ownership? This cannot be undone.")) {
            console.log(listing.id)
            updateOwner(geckoId, userId)
            transactionComplete(listing.id)
            toggle()
        }
    }

    return (
        <>
        <SellGeckoForm geckoId={geckoId} editListingObject={listing} />
        <hr />
        Potential Buyers
        {buyers.length > 0 ? (
            <ListGroup>
                {buyers.map(buyer => {
                    //get username of buyer
                    const userInfo = users.find(user => user.id === buyer.buyerId)
                    return (
                    <ListGroupItem key={"buyer_"+buyer.buyerId}>{userInfo.username} 
                            <a href={"mailto:"+userInfo.email}>{userInfo.email}</a>
                            <CopyToClipboard 
                            text={userInfo.email}
                            onCopy={() => {
                                setCopied({copied: true})
                                setCopyText("Copied!")
                                }
                            }>
                            <Badge className="copyButton" href="#" color="light">{copyText}</Badge>
                            </CopyToClipboard>
                            <Button
                                className="btn-sm"
                                color="warning"
                                onClick={() => transferOwnership(buyer.buyerId)}
                            >Finalize Transfer</Button>
                    </ListGroupItem>
                    )
                })}
            </ListGroup>
        ) : (
            <>No inquieries yet!</>
        )}
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