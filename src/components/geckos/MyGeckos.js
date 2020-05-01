import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import AddGeckoForm from "./AddGeckoForm"
import AddMorph from "./AddMorph"
import GeckoList from "./GeckoList"

export default () => {

    const [addGeckoModal, setAddGeckoModal] = useState(false)
    const addGeckoToggle = () => setAddGeckoModal(!addGeckoModal)

    const [morphModal, setMorphModal] = useState(false)
    const morphToggle = () => setMorphModal(!morphModal)

    const [morphGeckoId, setMorphGeckoId] = useState()

    return (
        <>
            <Button onClick={addGeckoToggle}>Add Gecko</Button>
            <GeckoList />
            <Modal isOpen={addGeckoModal} toggle={addGeckoToggle} backdrop={"static"}>
                <ModalHeader toggle={addGeckoToggle}>
                    Add New Gecko
                </ModalHeader>
                <ModalBody>
                    <AddGeckoForm toggle={addGeckoToggle} morphToggle={morphToggle} setMorphGeckoId={setMorphGeckoId} />
                </ModalBody>
            </Modal>
            <Modal isOpen={morphModal} toggle={morphToggle} backdrop={"static"}>
                <ModalHeader toggle={morphToggle}>
                    Gecko Morph Info
                </ModalHeader>
                <ModalBody>
                    <AddMorph toggle={morphToggle} geckoId={morphGeckoId} />
                </ModalBody>
            </Modal>
        </>
    )
}