import React, { useState, useEffect } from "react"

export const ImageContext = React.createContext()

export const ImageProvider = (props) => {
    const [images, setImages] = useState([])

    const getImages = () => {
        return fetch("http://localhost:8088/images")
            .then(res => res.json())
            .then(setImages)
    }

    const addImage = image => {
        return fetch("http://localhost:8088/images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
            .then(_ => _.json())
            .then(image => {
                getImages()
                return image.id
             })
    }

    const deleteImage = imageId => {
        return fetch(`http://localhost:8088/images/${imageId}`, {
            method: "DELETE"
        })
            .then(getImages)
    }

    useEffect(() => {
        getImages()
    }, [])

    useEffect(() => {
        console.log("****  IMAGE APPLICATION STATE CHANGED  ****")
    }, [images])

    return (
        <ImageContext.Provider value={{
            images, addImage, deleteImage
        }}>
            {props.children}
        </ImageContext.Provider>
    )
}