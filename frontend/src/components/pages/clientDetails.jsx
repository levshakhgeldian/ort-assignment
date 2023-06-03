import React, { useState, useEffect, useRef } from 'react'
import ClientForm from '../client/clientForm'
import { useParams } from 'react-router-dom'
import clientsRepo from '../../services/clientsRepository'
import ipApi from '../../services/ipApi'
import { Button, Table } from 'react-bootstrap'

export default (props) => {
    const [isEditing, setEditing] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [client, setClient] = useState(null)
    const [geolocation, setGeolocation] = useState(null)

    const params = useParams()
    const clientID = params.clientId

    useEffect(() => {
        clientsRepo.GetByID(clientID).then(
            async (data) => {
                setGeolocation(await ipApi.Geolocation(data.ip))
                setClient(data)
                setLoading(false)
            }
        )
    }, []);

    const onSubmit = (e) => {
        setLoading(true)
        clientsRepo.Update(e.model).then(() => { setLoading(false) })
    }

    let gelocationTable = null
    if (geolocation) {
        gelocationTable = <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th className='text-center' colSpan={2}>Geolocation Data</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(geolocation).map((key, _) =>
                        <tr>
                            <th>{key}</th>
                            <td>{geolocation[key]}</td>
                        </tr>)}
                </tbody>
            </Table>
        </>
    }


    return (<>
        <Button
            className='w-100'
            variant={isEditing ? "danger" : "success"}
            disabled={isLoading}
            onClick={() => setEditing(!isEditing)}
        >
            {isEditing ? "Discard" : "Edit"}
        </Button>
        <ClientForm onSubmit={onSubmit} model={client} readonly={isLoading || !isEditing} />

        <br />
        {gelocationTable}
    </>)
}