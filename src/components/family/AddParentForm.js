import React, { useContext, useRef, useState } from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ImageContext } from "../images/ImageProvider"
import "./AddParentForm.css"
import { UserContext } from "../auth/UserProvider"

export default ({ geckoId, toggle }) => {

    const { geckos } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)
    const { users } = useContext(UserContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    //remove current gecko from the list
    const filteredGeckos = geckos.filter(gecko => {
        if (gecko.id === geckoId) {
            return false
        } else {
            return true
        }
    })

    //sort the list alphabetically by name
    filteredGeckos.sort((a, b) => (a.name > b.name) ? 1 : -1)

    //state of the parent preview box
    const [previewId, setPreviewId] = useState(0)

    const parentId = useRef()

    const createParent = () => {
        const parsedParentId = parseInt(parentId.current.value)

        //check to make sure that chosen gecko exists
        if (geckos.some(gecko => gecko.id === parsedParentId)) {

        } else {
            window.alert("There are no geckos with this name currently registered.")
        }
    }

    const showPreview = (geckoId) => {
        const previewGeckoObject = geckos.find(gecko => gecko.id === geckoId)

        //get image for gecko preview
        const featuredImage = images.find(image => image.id === previewGeckoObject.imageId)

        //get user info for gecko preview
        const ownerObj = users.find(user => user.id === previewGeckoObject.userId)

        return (
            <div className="parentPreview d-flex">
                <div className="parentPreviw__leftColumn">
                {previewGeckoObject.imageId === 0 || previewGeckoObject.imageId === null ? (
                    <div className="featuredImage featuredImage_placeholder img-thumbnail"></div>
                ): (
                    <img src={featuredImage.imageURL} className="featuredImage img-thumbnail" alt="" />
                )}
                </div>
                <div>
                <h5>{previewGeckoObject.name}</h5>
                <p>owned by {ownerObj.id === currentUserId ? "you" : ownerObj.username}</p>
                </div>
            </div>
        )
    }

    return (
        <Form>
            <FormGroup>
                <Label for="parentId">Select a parent...</Label>
                <Input
                    type="select"
                    innerRef={parentId}
                    name="parentId"
                    id="parentId"
                    placeholder="parent name"
                    onChange={event => setPreviewId(parseInt(event.target.value))}
                >   
                    <option key={"parent_default"} value="0">Please select...</option>
                    {filteredGeckos.map(parent => {
                        return <option key={"parent_"+parent.id} value={parent.id}>{parent.name}</option>
                    })}
                </Input>
            </FormGroup>
            {previewId !== 0 ? showPreview(previewId) : ""}
            <FormGroup className="text-right mt-2">
                <Button
                    type="submit"
                    color="primary"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            
                        }
                    }
                >Add Parent</Button>
                <Button
                    onClick={toggle}
                    className="ml-2"
                    >Cancel</Button>
            </FormGroup>
        </Form>
    )
}