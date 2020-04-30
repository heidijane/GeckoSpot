import React, { useRef } from "react"
import { Form, FormGroup, FormText, Input, Label, Col, Row, Button } from "reactstrap"
import "./AddGeckoForm.css"

export default () => {
    const geckoName = useRef()
    const geckoSex = useRef() 

    return (
        <>
        <Form>
            <FormGroup>
                <Label for="geckoForm__name">Gecko Name</Label>
                <Input 
                    innerRef={geckoName}
                    type="text"
                    id="geckoForm__name"
                    name="geckoName"
                    placeholder="Gecko Name"
                    required
                    autoFocus />
            </FormGroup>   
            <FormGroup>
                <Label for="geckoForm__sex">Gecko Sex</Label>
                <Input
                    innerRef={geckoSex}
                    type="select"
                    name="geckoSex"
                    id="geckoForm__name"
                >
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                </Input>
            </FormGroup>    
        </Form>
       </>
    )
}