import React, { useState, useEffect } from "react"

export const ListingContext = React.createContext()

export const ListingProvider = (props) => {
    const [listings, setListings] = useState([])

    const getListings = () => {
        return fetch("http://localhost:8088/marketplace?_embed=marketplaceBuyers")
            .then(res => res.json())
            .then(setListings)
    }

    const addListing = listing => {
        return fetch("http://localhost:8088/marketplace", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listing)
        })
            .then(_ => _.json())
            .then(listing => {
                getListings()
                return listing.id
             })
    }

    const deleteListing = listingId => {
        return fetch(`http://localhost:8088/marketplace/${listingId}`, {
            method: "DELETE"
        })
            .then(getListings)
    }

    const updateListing = listing => {
        return fetch(`http://localhost:8088/marketplace/${listing.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listing)
        })
            .then(getListings)
    }

    const addPurchaseInquiry = inquiry => {
        return fetch("http://localhost:8088/marketplaceBuyers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiry)
        })
            .then(_ => _.json())
            .then(inquiry => {
                getListings()
                return inquiry.id
             })
    }

    useEffect(() => {
        getListings()
    }, [])

    useEffect(() => {
        console.log("****  MARKETPLACE APPLICATION STATE CHANGED  ****")
    }, [listings])

    return (
        <ListingContext.Provider value={{
            listings, addListing, deleteListing, updateListing, addPurchaseInquiry
        }}>
            {props.children}
        </ListingContext.Provider>
    )
}