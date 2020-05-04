import React, { useContext, useRef } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from "reactstrap"
import { GeckoContext } from "../geckos/GeckoProvider"

export default ({ geckoId, toggleState, toggle }) => {

    const { geckos } = useContext(GeckoContext)
    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const currentUserGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    const geckoToBeFed = useRef()

    return (
        <Modal isOpen={toggleState} toggle={toggle}>
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
                                {
                                    currentUserGeckos.map(gecko => {
                                        return <option key={"geckoDropdown_"+gecko.id} value={gecko.id}>{gecko.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
    )
}