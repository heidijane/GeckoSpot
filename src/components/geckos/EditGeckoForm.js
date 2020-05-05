import React, { useRef, useContext } from "react"
import { Form, FormGroup, FormText, Input, Label, Button } from "reactstrap"
import DatePicker from "reactstrap-date-picker"
import "./AddGeckoForm.css"
import { GeckoContext } from "./GeckoProvider"

export default ({ toggle, geckoObjToEdit }) => {

    const { updateGecko } = useContext(GeckoContext)

    const geckoName = useRef()
    const geckoSex = useRef()
    const hatchDate = useRef()
    const geckoProfile = useRef()

    const convertToTimestamp = (string) => {
        return (Date.parse(string)/1000)
    }

    let defaultDate = ""
    //get the ISO string form of the hatch date
    if (geckoObjToEdit.hatchDate !== null) {
        defaultDate = new Date(geckoObjToEdit.hatchDate*1000).toISOString()
    }

    const editGecko = () => {

        //make sure user has given their gecko a name, if so go ahead and add it
        if (geckoName.current.value) {

            //convert string date into timestamp
            const newGeckoObj = {
                userId: parseInt(sessionStorage.getItem("activeUser")),
                name: geckoName.current.value,
                sex: parseInt(geckoSex.current.value),
                hatchDate: convertToTimestamp(hatchDate.current.state.value),
                profile: geckoProfile.current.value,
                id: geckoObjToEdit.id
            }
            updateGecko(newGeckoObj)
                .then(toggle)
        } else {
            window.alert("Please give your gecko a name!")
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label for="geckoForm__name">Gecko Name</Label>
                <Input 
                    innerRef={geckoName}
                    type="text"
                    id="geckoForm__name"
                    name="geckoName"
                    placeholder="Gecko Name"
                    required
                    autoFocus
                    defaultValue={geckoObjToEdit.name}
                    />
            </FormGroup>   
            <FormGroup>
                <Label for="geckoForm__sex">Gecko Sex</Label>
                <Input
                    innerRef={geckoSex}
                    type="select"
                    name="geckoSex"
                    id="geckoForm__name"
                    defaultValue={geckoObjToEdit.sex}
                >
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="geckoForm__hatchDate">Hatch Date</Label>
                <DatePicker
                    ref={hatchDate}
                    id="geckoForm__hatchDate"
                    name="hatchDate"
                    value={defaultDate}
                    clearButtonElement="Clear"
                />
                <FormText color="muted">
                If you do not know your gecko's exact hatch date you can give an estimate based upon your gecko's age. 
                If the age of your gecko is unknown it's fine to leave this blank!
                </FormText>
            </FormGroup> 
            <FormGroup>
                <Label for="geckoForm__profile">Profile <span className="font-italic">(optional)</span></Label>
                <Input
                    innerRef={geckoProfile}
                    type="textarea"
                    id="geckoForm__profile"
                    name="geckoProfile"
                    placeholder="My gecko is the coolest."
                    defaultValue={geckoObjToEdit.profile}
                />
                <FormText color="muted">
                Let everyone know what makes your gecko unique!
                </FormText>
            </FormGroup>
            <FormGroup className="text-right">
                <Button 
                type="submit"
                color="primary"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        editGecko()
                    }
                }
                >Edit Gecko Info</Button>   
                <Button
                onClick={toggle}
                >Cancel</Button>   
            </FormGroup>
        </Form>
    )
}