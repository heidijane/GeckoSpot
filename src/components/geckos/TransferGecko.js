import React, { useRef, useContext } from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import "./AddGeckoForm.css"
import { GeckoContext } from "./GeckoProvider"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "../marketplace/MarketplaceProvider"
  

export default ({ toggle, geckoId, setPageState }) => {

    const { updateOwner } = useContext(GeckoContext)
    const { users } = useContext(UserContext)
    const { listings, transactionComplete, updateBuyers } = useContext(ListingContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    //filter the current user out of the users dropdown
    const filteredUsers = users.filter(user => {
        if (user.id === currentUserId) {
            return false
        } else {
            return true
        }
    })

    const transferUserId = useRef()

    //sort the list alphabetically by username
    filteredUsers.sort((a, b) => (a.username > b.username) ? 1 : -1)

    const transferOwnership = (userId) => {
        if (userId === 0) {
            window.alert("Please choose a user to transfer your gecko to.")
        } else {
            if (window.confirm("Are you sure you wish to transfer ownership of this gecko? This cannot be undone.")) {
                updateOwner(geckoId, userId)
                    .then(() => {
                        const listing = listings.find(listing => listing.geckoId === geckoId)
                        if (listing !== undefined) {
                            //make a new array of marketplace buyer objects to update
                            let buyersToUpdate = []
                            listing.marketplaceBuyers.forEach(buyer => {
                                let purchased = false
                                if (userId === buyer.buyerId) {
                                    purchased = true
                                }
                                buyersToUpdate.push({marketplaceBuyerId: buyer.id, purchased: purchased})
                            }
                            )
                            updateBuyers(buyersToUpdate)
                            //close marketplace listing for gecko if there is one open
                            transactionComplete(listing.id)
                        }
                    })
                    .then(() => {
                        toggle()
                        setPageState("myGeckos")
                    })
            }
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label for="transferForm__userId">Choose a user...</Label>
                <Input
                innerRef={transferUserId}
                type="select"
                name="transferUserId"
                id="transferForm__userId"
                defaultValue={geckoId}
                >
                <option key={"transferUser_default"} value="0">Please select...</option>
                {
                    filteredUsers.map(user => {
                        return <option key={"transferUser_"+user.id} value={user.id}>{user.username}</option>
                    })
                }
                </Input>
            </FormGroup>
            <FormGroup className="text-right">
                <Button 
                    color="warning"
                    onClick={evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            transferOwnership(parseInt(transferUserId.current.value))
                    }}
                >
                    Transfer Ownership
                </Button>
            </FormGroup>
        </Form>
    )
}