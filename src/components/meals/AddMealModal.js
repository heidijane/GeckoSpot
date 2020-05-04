import React, { useContext, useRef, useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap"
import DatePicker from "reactstrap-date-picker"
import { GeckoContext } from "../geckos/GeckoProvider"
import { MealContext } from "./MealProvider"

export default ({ geckoId, toggleState, toggle, mealObjectToEdit, setMealObjectToEdit }) => {

    const { geckos } = useContext(GeckoContext)
    const { addMeal, updateMeal } = useContext(MealContext)
    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const currentUserGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    const geckoToBeFed = useRef()
    const mealType = useRef()
    const quantity = useRef()
    const mealDate = useRef()

    //array containing the default feeder insects
    const feeders = [
        "Mealworms",
        "Crickets",
        "Dubia Roaches",
        "Superworm",
        "Phoenix Worms",
        "Waxworms",
        "Silkworms",
        "Hornworms"
    ]

    //set states for the checkboxes
    const [calciumChecked, setCalciumChecked] = useState(false)
    const calciumCheckboxClicked = () => setCalciumChecked(!calciumChecked)

    const [d3Checked, setd3Checked] = useState(false)
    const d3CheckboxClicked = () => setd3Checked(!d3Checked)
    
    const [multivitaminChecked, setMultivitaminChecked] = useState(false)
    const multivitaminCheckboxClicked = () => setMultivitaminChecked(!multivitaminChecked)

    //every time the mealObjectToEdit is changed update the checkboxes' default values
    useEffect(() => {
        if (mealObjectToEdit.calciumSupplement === true) {
            setCalciumChecked(true)
        }
        if (mealObjectToEdit.d3Supplement === true) {
            setd3Checked(true)
        }
        if (mealObjectToEdit.multivitaminSupplement === true) {
            setMultivitaminChecked(true)
        }
    }, [mealObjectToEdit])

    //function to run when the modal is closed to reset the checkobx states and clear out the edit object
    const resetMealModal = () => {
        setCalciumChecked(false)
        setd3Checked(false)
        setMultivitaminChecked(false)
        setMealObjectToEdit({id:null})
    }

    const convertToTimestamp = (string) => {
        return (Date.parse(string)/1000)
    }

    const currentDate = new Date();
    let defaultDate = currentDate.toISOString()
    if (mealObjectToEdit.mealDate !== undefined) {
        defaultDate = new Date(mealObjectToEdit.mealDate*1000).toISOString()
    }

    const createMeal = () => {

        const parsedGeckoToBeFed = parseInt(geckoToBeFed.current.value)
        const parsedQuantity = parseInt(quantity.current.value)

        let errorTrigger = false

        if (parsedGeckoToBeFed === 0) {
            errorTrigger = true
            window.alert("Please choose a gecko to log a meal for.")
        }

        if (mealType.current.value === "0") {
            errorTrigger = true
            window.alert("Please select a meal type.")
        }

        //if user doesn't fill out the date set it to the current day
        let mealDateTimestamp = convertToTimestamp(currentDate)
        if (mealDate.current.state.value !== "") {
            mealDateTimestamp = convertToTimestamp(mealDate.current.state.value)
        }

        if (errorTrigger === false) {
            const mealObj = {
                geckoId: parsedGeckoToBeFed,
                mealType: mealType.current.value,
                quantity: parsedQuantity,
                calciumSupplement: calciumChecked,
                d3Supplement: d3Checked,
                multivitaminSupplement: multivitaminChecked,
                mealDate: mealDateTimestamp
            }

            //if there is a mealObject that is being edited update the row, otherwise add a new one
            if (mealObjectToEdit.id === null) {
                addMeal(mealObj)
                    .then(toggle)
            } else {
                mealObj.id = mealObjectToEdit.id
                updateMeal(mealObj)
                .then(toggle)
            }
        }
    }

    return (
        <Modal isOpen={toggleState} toggle={toggle} onClosed={resetMealModal}>
                <ModalHeader toggle={toggle}>
                    Log a Meal
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="mealForm__geckoToBeFed">Log a meal for...</Label>
                            <Input
                                innerRef={geckoToBeFed}
                                type="select"
                                name="geckoToBeFed"
                                id="mealForm__geckoToBeFed"
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
                        <Row form>
                            <Col md={10}>
                            <FormGroup>
                                <Label for="mealForm__mealType">Feeder</Label>
                                <Input
                                    innerRef={mealType}
                                    type="select"
                                    name="mealType"
                                    id="mealForm__mealType"
                                    defaultValue={mealObjectToEdit.mealType}
                                >
                                    <option key={"feeder_default"} value="0">Please select...</option>
                                    {
                                        feeders.map((feeder, key) => {
                                            return <option key={"feeder_"+key}>{feeder}</option>
                                        })
                                    }
                                </Input>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="mealForm__quantity">Quantity</Label>
                                    <Input
                                        innerRef={quantity}
                                        type="number"
                                        name="quantity"
                                        id="mealForm__quantity"
                                        min="1"
                                        defaultValue="1"
                                        defaultValue={mealObjectToEdit.quantity !== undefined ? mealObjectToEdit.quantity : "1"}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                            
                        <FormGroup check>
                            <Label>Supplements</Label>
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    name="supplements_calcium"
                                    id="mealForm__supplements--calcium"
                                    onChange={calciumCheckboxClicked}
                                    checked={calciumChecked}
                                />
                                <Label check for="mealForm__supplements--calcium">Calcium</Label>
                            </FormGroup>
                            
                            <FormGroup check>
                            <Input
                                type="checkbox"
                                name="supplements_d3"
                                id="mealForm__supplements--d3"
                                onChange={d3CheckboxClicked}
                                checked={d3Checked}
                            />
                            <Label check for="mealForm__supplements--d3">d3</Label>
                            </FormGroup>
                            
                            <FormGroup check>
                            <Input
                                type="checkbox"
                                name="supplements_multivitamin"
                                id="mealForm__supplements--multivitamin"
                                onChange={multivitaminCheckboxClicked}
                                checked={multivitaminChecked}
                            />
                            <Label check for="mealForm__supplements--multivitamin">Multivitamin</Label>
                            </FormGroup>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="mealForm__mealDate">Meal Date</Label>
                            <DatePicker
                                ref={mealDate}
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
                                createMeal()
                            }
                        }
                        >Save Meal</Button>   
                        <Button
                        onClick={toggle}
                        >Cancel</Button>   
                    </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
    )
}