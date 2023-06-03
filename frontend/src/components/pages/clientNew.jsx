import React, { useState, useEffect } from 'react'
import ClientForm from '../client/clientForm'
import clientsRepo from '../../services/clientsRepository'
import { useNavigate } from 'react-router-dom'

export default (props) => {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        setLoading(true)
        clientsRepo.Create(e.model).then(() => {
            navigate(`/client/${e.model.id}`)
            setLoading(false)
        })
    }

    return (<>
        <ClientForm onSubmit={onSubmit} readonly={isLoading} allowIdEditing={true} />
    </>)
}