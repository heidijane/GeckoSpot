import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import AddGeckoForm from "./AddGeckoForm"

export default () => {

    const [addGeckoModal, setAddGeckoModal] = useState(false)
    const addGeckoToggle = () => setAddGeckoModal(!addGeckoModal)

    const [morphModal, setMorphModal] = useState(false)
    const morphToggle = () => setMorphModal(!morphModal)

    return (
        <>
            <Button onClick={addGeckoToggle}>Add Gecko</Button>
            <Modal isOpen={addGeckoModal} toggle={addGeckoToggle}>
                <ModalHeader toggle={addGeckoToggle}>
                    Add New Gecko
                </ModalHeader>
                <ModalBody>
                    <AddGeckoForm />
                </ModalBody>
            </Modal>
        </>
    )
}