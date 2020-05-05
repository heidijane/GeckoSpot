import React, { useContext } from "react"
import { ImageContext } from "./ImageProvider"

export default ({ geckoId }) => {

    const { images } = useContext(ImageContext)
    const currentGeckoImages = images.filter(image => image.geckoId === geckoId)

    console.log(currentGeckoImages)

    return (
        <div className="d-flex flex-wrap justify-content-around">
            {
                currentGeckoImages.map(image => {
                    return <div className="thumbnail" key={"imgThumb_"+image.id}><img src={image.imageURL} className="thumbnail img-thumbnail" /></div>
                })
            }
        </div>
    )
}