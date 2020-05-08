import React, { useRef, useContext } from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import "./AddGeckoForm.css"
import { GeckoContext } from "./GeckoProvider"
import { UserContext } from "../auth/UserProvider"
import { ListingContext } from "../marketplace/MarketplaceProvider"
  

export default ({ toggle, geckoId, setPageState }) => {

    const { updateOwner } = useContext(GeckoContext)
    const { users } = useContext(UserContext)
    const { listings, transactionComplete } = useContext(ListingContext)

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
        if (window.confirm("Are you sure you wish to transfer ownership of this gecko? This cannot be undone.")) {
            updateOwner(geckoId, userId)
            const listing = listings.find(listing => listing.geckoId === geckoId)
            if (listing !== undefined) {
                //close marketplace listing for gecko if there is one open
                transactionComplete(listing.id)
            }
            toggle()
            setPageState("myGeckos")
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