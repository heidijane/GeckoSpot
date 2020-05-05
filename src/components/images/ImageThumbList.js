import React, { useContext, useState } from "react"
import { ImageContext } from "./ImageProvider"
import { Modal, ModalBody } from "reactstrap"
import "./ImageThumbList.css"

export default ({ geckoId }) => {

    const { images } = useContext(ImageContext)
    const currentGeckoImages = images.filter(image => image.geckoId === geckoId)

    //states for the image modal
    const [imageModal, setImageModal] = useState(false)
    const [chosenImage, setChosenImage] = useState({})
    const imageToggle = () => setImageModal(!imageModal)

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
                            <img src={image.imageURL} className="thumbnail img-thumbnail" alt="" />
                        </div>
                    )
                })
            }
        </div>
        <Modal isOpen={imageModal} toggle={imageToggle} className="imageModal" style={{maxWidth: '1600px', width: 'fit-content' }} centered={true}>
            <ModalBody>
               <img src={chosenImage.imageURL} />
            </ModalBody>
        </Modal>
        </>
    )
}