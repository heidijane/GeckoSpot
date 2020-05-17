import React, { useContext, useRef } from "react"
import { Form, FormGroup, Label, Input, InputGroup,InputGroupAddon, InputGroupText, Button } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"
import { WeightContext } from "./WeightProvider"
import DatePicker from "reactstrap-date-picker"

export default ({ toggle, geckoId }) => {

    const { addWeight } = useContext(WeightContext)

    const { geckos } = useContext(GeckoContext)
    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    let currentUserGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    //get the current date for use as the default value
    const currentDate = new Date();
    let defaultDate = currentDate.toISOString()

    const geckoWeightToBeLogged = useRef()
    const geckoWeight = useRef()
    const weighDateInput = useRef()

    const convertToTimestamp = (string) => {
        return (Date.parse(string)/1000)
    }

    const createWeight = () => {
        const parsedGeckoId = parseInt(geckoWeightToBeLogged.current.value)
        const parsedGeckoWeight = parseInt(geckoWeight.current.value)

        let errorTrigger = false

        if (parsedGeckoId === 0) {
            errorTrigger = true
            window.alert("Please choose a gecko to log a weight for.")
        }

        if (parsedGeckoWeight === 0) {
            errorTrigger = true
            window.alert("You did not input a weight.")
        }

        //if user doesn't fill out the date set it to the current day
        let weighDateTimestamp = convertToTimestamp(currentDate)
        if (weighDateInput.current.state.value !== "") {
           weighDateTimestamp = convertToTimestamp(weighDateInput.current.state.value)
        }

        if (errorTrigger === false) {
            addWeight({
                geckoId: parsedGeckoId,
                weight: parsedGeckoWeight,
                weighDate: weighDateTimestamp,
                deleted: false
            }).then(toggle)
        }

    }

    return (
        <Form>
            <FormGroup>
                <Label for="sellForm__geckoToBeSold">Choose a gecko...</Label>
                <Input
                innerRef={geckoWeightToBeLogged}
                type="select"
                name="geckoToBeSold"
                id="sellForm__geckoToBeSold"
                defaultValue={geckoId}
            >
                <option key={"feeder_default"} value="0">Please select...</option>
                {
                    currentUserGeckos.map(gecko => {
                        return <option key={"geckoDropdown_"+gecko.id} value={gecko.id}>{gecko.name}</option>
                    })
                }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="weightForm_geckoWeight">Weight</Label>
                <InputGroup>
                    <Input 
                        innerRef={geckoWeight}
                        type="number"
                        min="1"
                        max="200"
                        step="1"
                        placeholder="weight in grams"
                        name="geckoWeight"
                        id="weightForm_geckoWeight"
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>grams</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="mealForm__mealDate">Meal Date</Label>
                <DatePicker
                    ref={weighDateInput}
                    id="mealForm__mealDate"
                    name="mealDate"
                    clearButtonElement="Clear"
                    value={defaultDate}
                />
            </FormGroup>
            <FormGroup className="text-right">
                <Button
                    type="submit"
                    color="primary"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            createWeight()
                    }}
                >Log Weight</Button>
                <Button
                    onClick={toggle}
                    className="ml-2"
                    >Cancel</Button>
            </FormGroup>
        </Form>
    )
}