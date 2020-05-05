import React, { useContext, useState } from "react"
import { GeckoContext } from "./GeckoProvider"
import "./GeckoDetails.css"
import { Button, Badge, Modal, ModalHeader, ModalBody } from "reactstrap"
import MealLog from "../meals/MealLog"
import AddMealModal from "../meals/AddMealModal"
import { timestampToDateString } from "../../utilities/timestampToString"
import EditGeckoForm from "./EditGeckoForm"
import EditMorph from "./EditMorph"
import UploadImage from "../images/UploadImage"
import ImageThumbList from "../images/ImageThumbList"


export default ( props ) => {

    const { geckos, deleteGecko } = useContext(GeckoContext)

    const geckoId = props.geckoId

    const currentGecko = geckos.find(gecko => gecko.id === geckoId)
    let currentGeckoMorph = {}
    if (currentGecko.geckoMorphs[0] === undefined) {
        currentGeckoMorph = {
            id: null,
            geckoId: geckoId,
            colorMorph: "",
            eyeMorph: "",
            sizeMorph: ""
        }
    } else {
        currentGeckoMorph = currentGecko.geckoMorphs[0]
    }

    const [addMealModal, setAddMealModal] = useState(false)
    const addMealModalToggle = () => setAddMealModal(!addMealModal)

    //create state for the add meal modal for a meal object you want to edit
    const [mealObjectToEdit, setMealObjectToEdit] = useState({id: null})

    //state for the edit gecko info modal
    const [editGeckoModal, setEditGeckoModal] = useState(false)
    const editGeckoToggle = () => setEditGeckoModal(!editGeckoModal)

    //state for the edit morph modal
    const [editMorphModal, setEditMorphModal] = useState(false)
    const editMorphToggle = () => setEditMorphModal(!editMorphModal)
    
    //state for the image upload modal
    const [imageUploadModal, setImageUploadModal] = useState(false)
    const imageUploadToggle = () => setImageUploadModal(!imageUploadModal)

    //function that deletes gecko info from all tables
    const removeGecko = () => {
        deleteGecko(geckoId)
            .then(props.setPageState("myGeckos"))
    }

    return (
    <>
        <article className="geckoDetails">
            <section className="geckoDetails__leftColumn">
                <img src={require("../../images/sample.gif")} className="featuredImage" alt="sample" />
                <div><h1>{currentGecko.name}</h1></div>
                <div className="geckoDetails__hatchDateAndSex">
                    <div className="geckoDetails__hatchDate"><img src={require("../../images/icon_hatch.png")} alt="hatch date" title="hatch date" />{currentGecko.hatchDate !== null ? timestampToDateString(currentGecko.hatchDate) : "unknown"}</div>
                    <div className="geckoDetails__sex">{currentGecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" /> : <img src={require("../../images/icon_male.png")} alt="male" />}</div>
                </div>
                <div>{currentGecko.profile}</div>
                    {currentGeckoMorph.colorMorph !== "" ? <Badge className="mr-1">{currentGeckoMorph.colorMorph}</Badge> : ""}
                    {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{currentGeckoMorph.eyeMorph}</Badge> : ""}
                    {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
                <div className="text-right mt-2">
                    <Button 
                    className="btn-sm"
                    color="info"
                    onClick={editGeckoToggle}
                    >Edit Gecko Info</Button>
                    <Button 
                    className="btn-sm ml-2"
                    color="info"
                    onClick={editMorphToggle}
                    >Change Morph</Button>
                </div>
                <div className="text-right mt-2 imageList">
                    <ImageThumbList geckoId={geckoId} />
                    <Button
                    className="btn-sm"
                    color="info"
                    onClick={imageUploadToggle}
                    >Add Image</Button>
                </div>
            </section>
            <section className="geckoDetails__rightColumn">
                <MealLog geckoId={geckoId} addMealModalToggle={addMealModalToggle} setMealObjectToEdit={setMealObjectToEdit} />
                <div className="text-right mt-2">
                <Button
                    color="danger"
                    onClick={() => {
                        if(window.confirm("Are you sure you want to delete this gecko?")) {
                            removeGecko()
                        }
                    }
                    }
                >Delete Gecko</Button>
            </div>
            </section>
        </article>
        <AddMealModal geckoId={geckoId} toggleState={addMealModal} toggle={addMealModalToggle} mealObjectToEdit={mealObjectToEdit} setMealObjectToEdit={setMealObjectToEdit} />
        
        <Modal isOpen={editGeckoModal} toggle={editGeckoToggle} backdrop={"static"}>
            <ModalHeader toggle={editGeckoToggle}>
                Edit Gecko Info
            </ModalHeader>
            <ModalBody>
                <EditGeckoForm toggle={editGeckoToggle} geckoObjToEdit={currentGecko} />
            </ModalBody>
        </Modal>

        <Modal isOpen={editMorphModal} toggle={editMorphToggle} backdrop={"static"}>
            <ModalHeader toggle={editMorphToggle}>
                Edit Morph
            </ModalHeader>
            <ModalBody>
                <EditMorph toggle={editMorphToggle} morphObjToEdit={currentGeckoMorph} />
            </ModalBody>
        </Modal>

        <Modal isOpen={imageUploadModal} toggle={imageUploadToggle}>
            <ModalHeader toggle={imageUploadToggle}>
                Upload Image
            </ModalHeader>
            <ModalBody>
               <UploadImage toggle={imageUploadToggle} geckoId={geckoId} />
            </ModalBody>
        </Modal>
    </>)
}