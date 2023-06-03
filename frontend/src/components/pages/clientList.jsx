import React, { useState, useEffect, useReducer } from 'react'
import ClientsRepo from '../../services/clientsRepository'
import ClientEntry from '../client/clientEntry'
import { Button, Table, InputGroup, Form, Dropdown, DropdownButton, Spinner, Pagination } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';

const defaultSearchField = "firstname"
const searchFields = {
    id: "ID",
    firstname: "First Name",
    lastname: "Last Name",
    ip: "IP",
    phonenumber: "Phone Number",
}

function searchReducer(state, action) {
    return { ...state, ...action }
}

export default (props) => {
    const [isLoading, setLoading] = useState(true)
    const [clientList, setClientsList] = useState([])
    const [searchArgs, dispatchSearchArgs] = useReducer(searchReducer, { search: "", field: defaultSearchField, page: 1 })
    const [_, setQueryParams] = useSearchParams();

    const getClients = async (page, searchField, searchValue) => {
        setLoading(true)
        setClientsList([])
        const clients = await ClientsRepo.GetAll(page, searchField, searchValue)
        setClientsList(clients)
        setLoading(false)
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const field = searchParams.get("field")
        const search = searchParams.get("search")
        const page = searchParams.get("page")

        if (field && search)
            dispatchSearchArgs({ search, field, page })

        getClients(page, field, search)
    }, []);

    const onSearch = () => {
        updateQueryString(searchArgs.page, searchArgs.field, searchArgs.search)
        getClients(searchArgs.page, searchArgs.field, searchArgs.search)
    }

    const updateQueryString = (page, field, search) => {
        const searchParams = new URLSearchParams()

        if (page > 1)
            searchParams.append("page", page)

        if (field && search) {
            searchParams.append("field", field)
            searchParams.append("search", search)
        }

        setQueryParams(searchParams.toString())
    }

    const onPageChange = (delta) => {
        if (!delta)
            return

        const page = searchArgs.page + delta
        console.warn(page)

        dispatchSearchArgs({ page })
        updateQueryString(page, searchArgs.field, searchArgs.search)
        getClients(page, searchArgs.field, searchArgs.search)
    }

    const searchOptionElements = []
    for (const key in searchFields)
        searchOptionElements.push(<Dropdown.Item key={key} onClick={() => dispatchSearchArgs({ field: key })}>{searchFields[key]}</Dropdown.Item>)

    return (<>
        <InputGroup className="mb-3">
            <DropdownButton title={searchFields[searchArgs.field]} disabled={isLoading} >
                {searchOptionElements}
            </DropdownButton>
            <Form.Control onChange={(e) => dispatchSearchArgs({ search: e.target.value })}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={searchArgs.search}
            />
            <Button variant="outline-secondary" id="button-addon1" onClick={onSearch} disabled={isLoading} >
                Search
            </Button>
        </InputGroup>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>IP</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {clientList.map((client, _) => <ClientEntry model={client} />)}
            </tbody>
        </Table>

        {isLoading ? <div className="text-center"> <Spinner /> </div> : null}

        <div className='d-flex justify-content-center'>
            <Pagination>
                <Pagination.Prev disabled={searchArgs.page < 2} onClick={() => onPageChange(-1)} />
                <Pagination.Item>{searchArgs.page}</Pagination.Item>
                <Pagination.Next disabled={clientList.length < 1} onClick={() => onPageChange(1)} />
            </Pagination>
        </div>
    </>);
}