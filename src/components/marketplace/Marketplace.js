import React, { useState, useEffect, useContext } from "react"
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import SellGeckoForm from "../marketplace/SellGeckoForm"
import ListingList from "./ListingList"
import MyListing from "./MyListing"
import ListingDetails from "./ListingDetails"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ListingContext } from "./MarketplaceProvider"

export default () => {

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const { listings } = useContext(ListingContext)
    const { geckos } = useContext(GeckoContext)

    //state for the sell gecko modal
    const [sellGeckoModal, setsellGeckoModal] = useState(false)
    const sellGeckoModalToggle = () => setsellGeckoModal(!sellGeckoModal)

    //state for the my listing modal (only shows when user clicks on their own listings)
    const [myListingModal, setMyListingGeckoModal] = useState(false)
    const myListingModalToggle = () => setMyListingGeckoModal(!myListingModal)

    //state for the listing details modal (shows when users click on other users' listings)
    const [listingDetailsModal, setListingDetailsModal] = useState(false)
    const listingDetailsModalToggle = () => setListingDetailsModal(!listingDetailsModal)

    //state for the currect gecko
    const [geckoDetailId, setGeckoDetailId] = useState(null)

    //state for the sort buttons
    const [rSelected, setRSelected] = useState("all");

    const [geckoList, setGeckoList] = useState(listings)

    useEffect(() => {
        if (rSelected === "currentUser") {
            const currentUserListings = listings.filter(listing => {
                //find the gecko data for the listing
                const listingGeckoObj = geckos.find(gecko => gecko.id === listing.geckoId)
                if (listingGeckoObj.userId === currentUserId) {
                    return true
                } else {
                    return false
                }
            })
            setGeckoList(currentUserListings)
        } else {
            //show all
            setGeckoList(listings)
        }
    }, [rSelected, listings])

    return (
        <>
            <div className="page__navBar text-right">
                <div className="d-flex justify-content-start align-items-center">
                    <h4>My Geckos</h4>
                    <ButtonGroup className="ml-2">
                        <Button color="primary" onClick={() => setRSelected("all")} active={rSelected === "all"}>All Listings</Button>
                        <Button color="primary" onClick={() => setRSelected("currentUser")} active={rSelected === "currentUser"}>My Listings</Button>
                    </ButtonGroup>
                </div>
            
                <Button onClick={sellGeckoModalToggle} color="success" className="ml-2">Sell a Gecko</Button>
            </div>
            <ListingList listings={geckoList} setGeckoDetailId={setGeckoDetailId} myListingModal={myListingModalToggle} listingDetailsModal={listingDetailsModalToggle} />
            <Modal isOpen={sellGeckoModal} toggle={sellGeckoModalToggle} backdrop={"static"}>
                <ModalHeader toggle={sellGeckoModalToggle}>
                    Create Marketplace Listing
                </ModalHeader>
                <ModalBody>
                    <SellGeckoForm toggle={sellGeckoModalToggle} geckoId={null} editListingObject={{id:null}} />
                </ModalBody>
            </Modal>

            <Modal isOpen={myListingModal} toggle={myListingModalToggle} scrollable={true}>
                <ModalHeader toggle={myListingModalToggle}>
                    My Listing
                </ModalHeader>
                <ModalBody>
                    <MyListing toggle={myListingModalToggle} geckoId={geckoDetailId} />
                </ModalBody>
            </Modal>

            <Modal isOpen={listingDetailsModal} toggle={listingDetailsModalToggle} scrollable={true}>
                <ModalHeader toggle={listingDetailsModalToggle}>
                    Listing Details
                </ModalHeader>
                <ModalBody>
                    <ListingDetails toggle={listingDetailsModalToggle} geckoId={geckoDetailId} />
                </ModalBody>
            </Modal>
        </>
    )
}