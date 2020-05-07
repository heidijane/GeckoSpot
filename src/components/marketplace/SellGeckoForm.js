import React, { useContext, useRef } from "react"
import { Form, FormGroup, Input, Label, Button, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ListingContext } from "./MarketplaceProvider"

export default ({ geckoId, toggle, editListingObject }) => {

    if (editListingObject === undefined) {
        editListingObject = {id:null}
    }

    const { geckos } = useContext(GeckoContext)
    const { listings, addListing, updateListing } = useContext(ListingContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    let currentUserGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    //remove geckos that already have a listing
    const filteredUserGeckos = currentUserGeckos.filter(gecko => {
        if (listings.some(listing => listing.geckoId === gecko.id)) {
            return false
        } else {
            return true
        }
    })

    const geckoToBeSold = useRef()
    const geckoPrice = useRef()
    const listingNotes = useRef()

    const createListing = () => {
        const parsedGeckoToBeSold = parseInt(geckoToBeSold.current.value)
        const parsedGeckoPrice = parseFloat(geckoPrice.current.value)

        let errorTrigger = false

        if (parsedGeckoToBeSold === 0) {
            errorTrigger = true
            window.alert("Please choose a gecko to to sell.")
        }

        if (parsedGeckoPrice === 0) {
            errorTrigger = true
            window.alert("Please specify a selling price.")
        }

        if (errorTrigger === false) {
            const newListingObj = {
                geckoId: parsedGeckoToBeSold,
                sellerId: currentUserId,
                price: parsedGeckoPrice,
                listingNotes: listingNotes.current.value,
                listingDate: Math.round(new Date().getTime()/1000),
                transactionComplete: false
            }

            addListing(newListingObj)
                .then(toggle)

        }
    }

    const updateCurrentListing = () => {
        const parsedGeckoPrice = parseFloat(geckoPrice.current.value)
        if (parsedGeckoPrice !== 0) {
            updateListing({
                id: editListingObject.id,
                price: parsedGeckoPrice,
                listingNotes: listingNotes.current.value
            })
        } else {
            window.alert("Please specify a selling price.")
        }
    }

    return (
        <Form>
            
                
                {editListingObject.id === null ? (
                    <FormGroup>
                        <Label for="sellForm__geckoToBeSold">Choose a gecko...</Label>
                        <Input
                        innerRef={geckoToBeSold}
                        type="select"
                        name="geckoToBeSold"
                        id="sellForm__geckoToBeSold"
                        defaultValue={geckoId}
                    >
                        <option key={"feeder_default"} value="0">Please select...</option>
                        {
                            filteredUserGeckos.map(gecko => {
                                return <option key={"geckoDropdown_"+gecko.id} value={gecko.id}>{gecko.name}</option>
                            })
                        }
                        </Input>
                    </FormGroup>
                ) : (
                    <FormGroup>
                    <Label>Gecko</Label>
                    <Input
                        type="text"
                        disabled={true}
                value={geckos.find(gecko => gecko.id === geckoId).name} /></FormGroup>
                )}
                
            
            <FormGroup>
                <Label for="sellForm_geckoPrice">Price</Label>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                
                <Input
                    defaultValue={editListingObject.price !== "" && editListingObject.price !== undefined ? editListingObject.price : "100.00"}
                    type="number"
                    id="sellForm_geckoPrice"
                    step="5"
                    min="5"
                    max="10000"
                    innerRef={geckoPrice}
                    required
                    />
                </InputGroup>
            </FormGroup>
            <FormGroup>
            <Label for="sellForm__listingNotes">Listing Description <span className="font-italic">(optional)</span></Label>
                <Input
                    innerRef={listingNotes}
                    type="textarea"
                    id="sellForm__listingNotes"
                    name="listingNotes"
                    placeholder="Brief description of gecko's personality, genetic background, etc."
                    defaultValue={editListingObject.listingNotes}
                />
            </FormGroup>
            <FormGroup className="text-right">
            {editListingObject.id === null ? (
                <>
                <Button 
                    type="submit"
                    color="primary"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            createListing()
                        }
                    }
                >
                    Create Listing
                    </Button>   
                    <Button onClick={toggle} className="ml-2">Cancel</Button>
                    </>
            ) : (
                <Button 
                    type="submit"
                    color="primary"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            updateCurrentListing()
                        }
                    }
                >
                    Edit Listing
                    </Button> 
            )}
            </FormGroup>
        </Form>
    )
}