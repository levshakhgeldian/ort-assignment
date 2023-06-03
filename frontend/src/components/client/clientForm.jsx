import React, { useReducer, useEffect } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'


const fields = ["id", "firstName", "lastName", "ip", "phone"]

const emptyModel = fields.reduce((obj, field) => {
    obj[field] = ""
    return obj
}, {});

const emptyValidation = fields.reduce((obj, field) => {
    obj[field] = true
    return obj
}, {});

const validationMessages = {
    id: "ID must be 9 numeric characters",
    firstName: "First name must consist of characters only",
    lastName: "Last name must consist of characters only",
    ip: "Invalid IP address",
    phone: "Invalid phone number"
}

const validators = {
    id: (val) => val && val.match(/^\d+$/),
    firstName: (val) => val && val.match(/^[a-zA-Z\s]+$/),
    lastName: (val) => val && val.match(/^[a-zA-Z\s]+$/),
    ip: (val) => val && val.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
    phone: (val) => val && val.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
}

const buildFormField = (key, text, value, isValid, onChange, readonly = false) => {
    const fieldId = `client-input-${key}`

    return (
        <>
            <InputGroup>
                <InputGroup.Text id={fieldId} style={{ minWidth: "150px" }}>
                    {text}
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby={fieldId}
                    value={value || ''}
                    disabled={readonly}
                    model-key={key}
                    onChange={onChange}
                    isInvalid={!isValid}
                />
                <Form.Control.Feedback type="invalid">{validationMessages[key]}</Form.Control.Feedback>
            </InputGroup>
        </>
    )
}

const modelReducer = (state, action) => ({ ...state, ...action })
const validationReducer = (state, action) => ({ ...state, ...action })

export default (props) => {
    const [model, modelDispatch] = useReducer(modelReducer, emptyModel)
    const [invalidInputs, validationDispatch] = useReducer(validationReducer, emptyValidation)
    const readonly = props.readonly

    const onSubmit = (e) => {
        e.preventDefault()

        let valid = true
        for (const key in model) {
            const fieldValid = validators[key](model[key])
            validationDispatch({ [key]: fieldValid })
            valid = valid && fieldValid
        }

        if (valid && props.onSubmit)
            props.onSubmit({ model })
    }

    useEffect(() => modelDispatch(props.model), [props.model]);

    const onChange = (e) => {
        const element = e.target
        const key = element.getAttribute("model-key")
        modelDispatch({ [key]: element.value })
    }

    return (
        <>
            <Form >
                {buildFormField("id", "ID", model.id, invalidInputs.id, onChange, readonly || !props.allowIdEditing)}
                {buildFormField("firstName", "First Name", model.firstName, invalidInputs.firstName, onChange, readonly)}
                {buildFormField("lastName", "Last Name", model.lastName, invalidInputs.lastName, onChange, readonly)}
                {buildFormField("ip", "IP", model.ip, invalidInputs.ip, onChange, readonly)}
                {buildFormField("phone", "Phone", model.phone, invalidInputs.phone, onChange, readonly)}
                <Button className='w-100' variant="primary" onClick={onSubmit} disabled={readonly}>Submit</Button>
            </Form>
        </>
    )
}