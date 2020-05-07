import React, { useState, useEffect } from "react"

export const ListingContext = React.createContext()

export const ListingProvider = (props) => {
    const [listings, setListings] = useState([])

    const getListings = () => {
        return fetch("http://localhost:8088/marketplace")
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

    useEffect(() => {
        getListings()
    }, [])

    useEffect(() => {
        console.log("****  MEAL LOG APPLICATION STATE CHANGED  ****")
    }, [listings])

    return (
        <ListingContext.Provider value={{
            listings, addListing, deleteListing, updateListing
        }}>
            {props.children}
        </ListingContext.Provider>
    )
}