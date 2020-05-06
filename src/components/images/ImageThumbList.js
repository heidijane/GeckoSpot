import React, { useContext, useState } from "react"
import { ImageContext } from "./ImageProvider"
import { Modal, ModalBody, Button } from "reactstrap"
import "./ImageThumbList.css"
import { GeckoContext } from "../geckos/GeckoProvider"

export default ({ geckoId, currentUser }) => {

    const { images, deleteImage } = useContext(ImageContext)
    const { geckos, updateGecko } = useContext(GeckoContext)
    const currentGeckoImages = images.filter(image => image.geckoId === geckoId)

    //states for the image modal
    const [imageModal, setImageModal] = useState(false)
    const [chosenImage, setChosenImage] = useState({})
    const imageToggle = () => setImageModal(!imageModal)

    const removeImage = (imageId) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            deleteImage(imageId)
            imageToggle()
        }
    }

    const featureImage = (newImageId) => {
        //find the object associated with the geckoId
        const geckoObj = geckos.find(gecko => gecko.id === geckoId)
        const newGeckoObj = {
            userId: geckoObj.userId,
            name:  geckoObj.name,
            sex: geckoObj.sex,
            hatchDate: geckoObj.hatchDate,
            profile: geckoObj.profile,
            imageId: newImageId,
            id: geckoObj.id
        }
        updateGecko(newGeckoObj)
    }

    return (
        <>
        <div className="d-flex flex-wrap justify-content-around">
            {
                currentGeckoImages.map(image => {
                    return (
                        <div 
                            className="thumbnail"
                            key={"imgThumb_"+image.id}
                            onClick={() => {
                                    setChosenImage(image)
                                    imageToggle()
                                }
                            }
                            >
                            <img src={image.imageURL} className="thumbnail img-thumbnail" alt={image.imageNote} />

                        </div>
                    )
                })
            }
        </div>
        <Modal isOpen={imageModal} toggle={imageToggle} className="imageModal" style={{maxWidth: '1600px', width: 'fit-content' }} centered={true}>
            <ModalBody>
                <div className="position-relative">
                    <img src={chosenImage.imageURL}  alt={chosenImage.imageNote} id="spotlightImage" />
                    <div className="image_userActions">
                    {currentUser ? (
                                        <>
                                        <Button className="btn-sm" onClick={() => featureImage(chosenImage.id)}>Make Gecko Profile Photo</Button>
                                        <Button className="btn-sm ml-2" onClick={() => removeImage(chosenImage.id)}>Delete</Button>
                                        </>
                                    ): (
                                        ""
                                    )}
                    <Button onClick={imageToggle} className="btn-sm ml-2">Close</Button>
                    </div>
                </div>
        {chosenImage.imageNote !== "" ? <div className="imageNote">{chosenImage.imageNote}</div> : ""}
            </ModalBody>
        </Modal>
        </>
    )
}