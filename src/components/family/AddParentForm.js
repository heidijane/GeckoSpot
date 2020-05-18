import React, { useContext, useRef, useState } from "react"
import { Form, FormGroup, Input, Label, Button, Badge } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ImageContext } from "../images/ImageProvider"
import "./AddParentForm.css"
import { UserContext } from "../auth/UserProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import { FamilyContext } from "./FamilyProvider"

export default ({ geckoId, toggle }) => {

    const { geckos } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)
    const { users } = useContext(UserContext)
    const { parents, addParent, updateParent } = useContext(FamilyContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    const currentGeckoObject = geckos.find(gecko => gecko.id === geckoId)

    //remove current gecko from the list
    const filteredGeckos = geckos.filter(gecko => {
        if (gecko.id === geckoId) {
            return false
        } else {
            return true
        }
    })

    //get list of male geckos
    const maleGeckos = filteredGeckos.filter(gecko => gecko.sex === 1)
    //get list of female geckos
    const femaleGeckos = filteredGeckos.filter(gecko => gecko.sex === 0)

    //get gecko's current parents
    const parentRelationships = parents.filter(parent => parent.geckoId === geckoId)
    //match relationship up with gecko object
    const geckoParents = parentRelationships.map(rel => {
        const matchedGecko = geckos.find(gecko => gecko.id === rel.parentId)
        if (matchedGecko !== undefined) {
            matchedGecko.relId = rel.id
            return matchedGecko
        } else {
            return {relId: rel.id, id: 0}
        }
    })
    
    //assign a mother/father value to the relationship if they are set as unknown
    geckoParents.forEach(parent => {
        if (parent.sex === undefined && !geckoParents.some(par => par.sex === 0)) {
            parent.sex = 0
        } else if (parent.sex === undefined && !geckoParents.some(par => par.sex === 1)) {
            parent.sex = 1
        }
    })
    
    const geckoMother = geckoParents.find(gecko => gecko.sex === 0)
    const geckoFather = geckoParents.find(gecko => gecko.sex === 1)

    //sort the list alphabetically by name
    filteredGeckos.sort((a, b) => (a.name > b.name) ? 1 : -1)

    //state of the parent preview boxes
    const [motherPreviewId, setMotherPreviewId] = useState(geckoMother !== undefined ? geckoMother.id : 0)
    const [fatherPreviewId, setFatherPreviewId] = useState(geckoFather !== undefined ? geckoFather.id : 0)

    const motherId = useRef()
    const fatherId = useRef()

    const createParent = () => {
        const parsedMotherId = parseInt(motherId.current.value)
        const parsedFatherId = parseInt(fatherId.current.value)

        //add/update mother gecko
        //determine if row needs to be updated or added
        if (geckoMother === undefined && !geckoParents.some(par => par.sex === 0)) {
            //add new row
            addParent({
                geckoId: geckoId,
                parentId: parsedMotherId
            })
        } else {
            //update row
            const objToUpdate = geckoParents.find(gecko => gecko.sex === 0)
            updateParent({
                id: objToUpdate.relId,
                parentId: parsedMotherId
            })
        }
        if (geckoFather === undefined && !geckoParents.some(par => par.sex === 1)) {
            //add new row
            addParent({
                geckoId: geckoId,
                parentId: parsedFatherId
            })
        } else {
            //update row
            const objToUpdate = geckoParents.find(gecko => gecko.sex === 1)
            updateParent({
                id: objToUpdate.relId,
                parentId: parsedFatherId
            })
        }
        toggle()
    }

    const showPreview = (geckoId) => {
        const previewGeckoObject = geckos.find(gecko => gecko.id === geckoId)

        //get image for gecko preview
        const featuredImage = images.find(image => image.id === previewGeckoObject.imageId)

        //get user info for gecko preview
        const ownerObj = users.find(user => user.id === previewGeckoObject.userId)

        //get morph info if available
        let geckoMorph = {}
        if (previewGeckoObject.geckoMorphs[0] === undefined) {
            geckoMorph = {
                id: null,
                geckoId: previewGeckoObject.id,
                colorMorph: "",
                eyeMorph: "",
                sizeMorph: ""
            }
        } else {
            geckoMorph = previewGeckoObject.geckoMorphs[0]
        }

        return (
            <div className="parentPreview d-flex">
                <div className="parentPreviw__leftColumn">
                {previewGeckoObject.imageId === 0 || previewGeckoObject.imageId === null ? (
                    <div className="featuredImage featuredImage_placeholder img-thumbnail"></div>
                ): (
                    <img src={featuredImage.imageURL} className="featuredImage img-thumbnail" alt="" />
                )}
                </div>
                <div className="ml-2">
                <h5>{previewGeckoObject.name} {previewGeckoObject.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" className="genderIcon" /> : <img src={require("../../images/icon_male.png")} alt="male" className="genderIcon" />}</h5>
                <div className="mt-n2">
                    {geckoMorph.colorMorph !== "" ? <Badge className="mr-1">{geckoMorph.colorMorph}</Badge> : ""}
                    {geckoMorph.eyeMorph !== "" && geckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{geckoMorph.eyeMorph}</Badge> : ""}
                    {geckoMorph.sizeMorph !== "" && geckoMorph.sizeMorph !== "Normal" ? <Badge>{geckoMorph.sizeMorph}</Badge> : ""}
                </div>
                <p>hatched on {timestampToDateString(previewGeckoObject.hatchDate)}<br />
                owned by {ownerObj.id === currentUserId ? "you" : ownerObj.username}             
                </p>
                <p></p>
                </div>
            </div>
        )
    }

    return (
        <Form>
            <FormGroup>
    <Label for="motherId">{currentGeckoObject.name}'s Mother</Label>
                <Input
                    type="select"
                    innerRef={motherId}
                    name="motherId"
                    id="motherId"
                    defaultValue={geckoMother !== undefined ? geckoMother.id : 0}
                    onChange={event => setMotherPreviewId(parseInt(event.target.value))}
                >   
                    <option key={"mother_default"} value="0">Unknown</option>
                    {femaleGeckos.map(parent => {
                        return <option key={"mother_"+parent.id} value={parent.id}>{parent.name}</option>
                    })}
                </Input>
            </FormGroup>
            {motherPreviewId !== 0 ? showPreview(motherPreviewId) : ""}


            <FormGroup>
                <Label for="fatherId">{currentGeckoObject.name}'s Father</Label>
                <Input
                    type="select"
                    innerRef={fatherId}
                    name="fatherId"
                    id="fatherId"
                    defaultValue={geckoFather !== undefined ? geckoFather.id : 0}
                    onChange={event => setFatherPreviewId(parseInt(event.target.value))}
                >   
                    <option key={"father_default"} value="0">Unknown</option>
                    {maleGeckos.map(parent => {
                        return <option key={"father_"+parent.id} value={parent.id}>{parent.name}</option>
                    })}
                </Input>
            </FormGroup>
            {fatherPreviewId !== 0 ? showPreview(fatherPreviewId) : ""}
            <FormGroup className="text-right mt-2">
                <Button
                    type="submit"
                    color="primary"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            createParent()
                        }
                    }
                >Save</Button>
                <Button
                    onClick={toggle}
                    className="ml-2"
                    >Cancel</Button>
            </FormGroup>
        </Form>
    )
}