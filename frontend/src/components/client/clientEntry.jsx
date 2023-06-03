import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default (props) => {
    const navigate = useNavigate()
    const model = props.model

    const onClick = () => {
        navigate(`/client/${model.id}`)
    }

    return (<>
        <tr key={model.id} onClick={onClick} >
            <th>{model.id}</th>
            <td>{model.firstName}</td>
            <td>{model.lastName}</td>
            <td>{model.ip}</td>
            <td>{model.phone}</td>
            <td><Link>Details &gt;&gt;</Link></td>
        </tr>
    </>)
}