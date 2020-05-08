import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import AddGeckoForm from "./AddGeckoForm"
import AddMorph from "./AddMorph"
import GeckoList from "./GeckoList"
import AddMealModal from "../meals/AddMealModal"

export default ({ setPageState, setGeckoDetailsId }) => {

    const [addGeckoModal, setAddGeckoModal] = useState(false)
    const addGeckoToggle = () => setAddGeckoModal(!addGeckoModal)

    const [morphModal, setMorphModal] = useState(false)
    const morphToggle = () => setMorphModal(!morphModal)

    const [morphGeckoId, setMorphGeckoId] = useState()

    //state for the log a meal modal
    const [addMealModal, setAddMealModal] = useState(false)
    const addMealModalToggle = () => setAddMealModal(!addMealModal)

    return (
        <>
            <div className="page__navBar text-right">
                <h4>My Geckos</h4>
                <div className="text-right">
                    <Button onClick={addGeckoToggle} color="primary">Add Gecko</Button>
                    <Button onClick={addMealModalToggle} color="primary" className="ml-2">Log a Meal</Button>
                </div>
            </div>
            
            <GeckoList setPageState={setPageState} setGeckoDetailsId={setGeckoDetailsId} />
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
            <AddMealModal geckoId={null} toggleState={addMealModal} toggle={addMealModalToggle} mealObjectToEdit={{id:null}} />
        </>
    )
}