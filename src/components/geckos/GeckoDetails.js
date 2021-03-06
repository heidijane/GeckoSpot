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
import { ImageContext } from "../images/ImageProvider"
import SellGeckoForm from "../marketplace/SellGeckoForm"
import { ListingContext } from "../marketplace/MarketplaceProvider"
import MyListing from "../marketplace/MyListing"
import TransferGecko from "./TransferGecko"
import WeightLog from "../weight/WeightLog"
import AddParentForm from "../family/AddParentForm"
import FamilyTree from "../family/FamilyTree"


export default ( props ) => {

    const { geckos, deleteGecko } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)
    const { listings } = useContext(ListingContext)

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

    //get featured image info
    const featuredImage = images.find(image => image.id === currentGecko.imageId)

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

    //state for the select profile image modal
    const [featuredImageModal, setFeaturedImageModal] = useState(false)
    const featuredImageToggle = () => setFeaturedImageModal(!featuredImageModal)

    //function that deletes gecko info from all tables
    const removeGecko = () => {
            deleteGecko(geckoId)
            .then(props.setPageState("myGeckos"))
    }

    //sell in marketplace modal
    const [sellModal, setSellModal] = useState(false)
    const sellModalToggle = () => setSellModal(!sellModal)

    //marketplace listing details modal
    const [listingModal, setListingModal] = useState(false)
    const listingModalToggle = () => setListingModal(!listingModal)

    const listing = listings.find(listing => listing.geckoId === geckoId)

    //transfer ownership modal
    const [transferModal, setTransferModal] = useState(false)
    const transferModalToggle = () => setTransferModal(!transferModal)

    //add parent modal
    const [parentModal, setParentModal] = useState(false)
    const parentModalToggle = () => setParentModal(!parentModal)

    return (
    <>
        <article className="geckoDetails page_container">
            <section className="geckoDetails__leftColumn">
                <div className="d-flex justify-content-center">
                <div className="featuredImage_wrapper">
                    {currentGecko.imageId === 0 || currentGecko.imageId === null ? (
                        <div className="featuredImage featuredImage_placeholder"></div>
                    ): (
                        <img src={featuredImage.imageURL} className="featuredImage" alt="" />
                    )}
                        <Button className="changeImageButton btn-sm ml-2" onClick={featuredImageToggle}>Change</Button>
                </div>
                </div>
                <div className="d-flex justify-content-between align-items-center"><h2>{currentGecko.name}</h2><h4>{currentGecko.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" className="genderIcon" /> : <img src={require("../../images/icon_male.png")} alt="female" className="genderIcon" />}</h4></div>
                <div className="geckoMorph">
                {currentGeckoMorph.colorMorph !== "" ? <Badge className="mr-1">{currentGeckoMorph.colorMorph}</Badge> : ""}
                {currentGeckoMorph.eyeMorph !== "" && currentGeckoMorph.eyeMorph !== "Normal" ? <Badge className="mr-1">{currentGeckoMorph.eyeMorph}</Badge> : ""}
                {currentGeckoMorph.sizeMorph !== "" && currentGeckoMorph.sizeMorph !== "Normal" ? <Badge>{currentGeckoMorph.sizeMorph}</Badge> : ""}
                </div>
                
                <div className="section mt-2">
                    <div className="section_header">Hatch Date</div>
                    <div>{currentGecko.hatchDate !== null ? timestampToDateString(currentGecko.hatchDate) : "unknown"}</div>
                </div>

                <div className="section mt-2">
                    <div className="section_header">Profile</div>
                    {currentGecko.profile !== "" ? currentGecko.profile : <span className="font-italic">none</span>}
                </div>
                <div className="mt-2">
                    <Button 
                    className="btn-sm invert btn-block mt-2"
                    outline
                    color="secondary"
                    onClick={editGeckoToggle}
                    ><img src={require("../../images/icon_edit.png")} alt="edit gecko info"/> Edit Gecko Info</Button>
                    <Button 
                    className="btn-sm invert btn-block mt-2"
                    outline
                    color="secondary"
                    onClick={editMorphToggle}
                    ><img src={require("../../images/icon_color.png")} alt="change morph"/> Change Morph</Button>
                </div>
                <hr />
                <div className="section imageList">
                    <div className="section_header text-left">Photos</div>
                    <ImageThumbList geckoId={geckoId} currentUser={true} />
                    <Button
                    className="btn-sm invert btn-block mt-2"
                    outline
                    color="secondary"
                    onClick={imageUploadToggle}
                    ><img src={require("../../images/icon_image.png")} alt="add image"/> Add Image</Button>
                </div>
                <hr />
                <div className="section">
                    <div className="section_header">Family</div>
                    <FamilyTree geckoId={geckoId} />
                </div>
                
                <div className="mt-2">
                    <Button
                        className="btn-sm invert btn-block mt-2"
                        outline
                        color="secondary"
                        onClick={parentModalToggle}
                        ><img src={require("../../images/icon_family.png")} alt="update gecko parents"/> Update Parents</Button>
                </div>
            </section>
            <section className="geckoDetails__rightColumn">
                <MealLog geckoId={geckoId} addMealModalToggle={addMealModalToggle} setMealObjectToEdit={setMealObjectToEdit} />
                <WeightLog geckoId={geckoId} />
                <div className="mt-2 text-right">
                {listing === undefined ? (
                    <Button
                    color="success"
                    onClick={sellModalToggle}
                    >
                        <img src={require("../../images/icon_sell.png")} alt="sell gecko"/> Sell in Marketplace
                    </Button>
                ) : (
                    <Button
                    color="success"
                    onClick={listingModalToggle}
                    >
                        <img src={require("../../images/icon_sell.png")} alt="marketplace listing"/> Listing Details
                    </Button>
                )}
                <Button
                    color="warning"
                    onClick={transferModalToggle}
                    className="ml-2"
                >
                    Transfer Ownership
                </Button>
                <Button
                    color="danger"
                    className="ml-2"
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

        <Modal isOpen={featuredImageModal} toggle={featuredImageToggle} scrollable={true}>
            <ModalHeader toggle={featuredImageToggle}>
                Choose an image
            </ModalHeader>
            <ModalBody>
                <div className="mt-2 imageList larger">
                    <ImageThumbList geckoId={geckoId} currentUser={true} />
                </div>
            </ModalBody>
        </Modal>

        <Modal isOpen={sellModal} toggle={sellModalToggle} scrollable={true}>
            <ModalHeader toggle={sellModalToggle}>
            Create Marketplace Listing
            </ModalHeader>
            <ModalBody>
                <SellGeckoForm toggle={sellModalToggle} geckoId={geckoId} editListingObject={{id:null}} />
            </ModalBody>
        </Modal>

        <Modal isOpen={listingModal} toggle={listingModalToggle} scrollable={true}>
            <ModalHeader toggle={listingModalToggle}>
            Listing Details
            </ModalHeader>
            <ModalBody>
                <MyListing toggle={listingModalToggle} geckoId={geckoId} setPageState={props.setPageState} />
            </ModalBody>
        </Modal>

        <Modal isOpen={transferModal} toggle={transferModalToggle} scrollable={true}>
            <ModalHeader toggle={transferModalToggle}>
            Transfer Ownership
            </ModalHeader>
            <ModalBody>
                <TransferGecko toggle={listingModalToggle} geckoId={geckoId} setPageState={props.setPageState} />
            </ModalBody>
        </Modal>

        <Modal isOpen={parentModal} toggle={parentModalToggle}>
            <ModalHeader toggle={parentModalToggle}>
            Add a Parent
            </ModalHeader>
            <ModalBody>
                <AddParentForm toggle={parentModalToggle} geckoId={geckoId} />
            </ModalBody>
        </Modal>
    </>)
}