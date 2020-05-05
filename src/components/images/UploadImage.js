import React, { useState, useEffect, useContext } from "react"
import { Form, FormGroup, Input, Label, Spinner, Button } from "reactstrap"
import { ImageContext } from "./ImageProvider"

export default ({ geckoId, toggle }) => {

    const { addImage } = useContext(ImageContext)

    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (image !== "") {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [image])

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'geckospot_image')
        setLoading(true)
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dv5mpxfwl/image/upload",
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }

    const saveImage = () => {
        addImage({
            geckoId: geckoId,
            imageURL: image,
            uploadDate: Math.round(new Date().getTime()/1000)
        }).then(toggle)
    }

    return (    
    <>
        <Form>
            <FormGroup>
                <Label for="">Image</Label>
                <Input
                    type="file"
                    name="uploadImage"
                    id="uploadImage"
                    placeholder="Choose an image..."
                    onChange={uploadImage}
                />
                {loading ? (
                    <Spinner color="warning" />
                ): (
                    <img src={image} className="img-fluid img-thumbnail" alt="" />
                )}
            </FormGroup>
            <FormGroup className="text-right">
                    <Button 
                        color="primary"
                        disabled={disabled}
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                saveImage()
                            }
                        }
                        >Save Image</Button>
            </FormGroup>
        </Form>
    </>
    )
}