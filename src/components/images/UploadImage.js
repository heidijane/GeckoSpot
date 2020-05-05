import React, { useState, useRef } from "react"
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap"

export default () => {

    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

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

    const fileURL = useRef()

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
                    innerRef={fileURL}
                />
                {loading ? (
                    <Spinner color="warning" />
                ): (
                    <img src={image} className="img-fluid img-thumbnail" />
                )}
                
            </FormGroup>
        </Form>
    </>
    )
}