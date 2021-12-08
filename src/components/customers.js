import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
    }, [])


    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .catch(err => console.error(err))
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchCustomers())
            .then(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
        console.log('in saveTraining');
        console.log('training is: ');
        console.log(JSON.stringify(training));
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(training)
            })
            .then(res => fetchCustomers())
            .then(err => console.error(err))
    }

    const columns = [

        {
            sortable: false,
            filterable: false,
            width: 150,
            accessor: 'links[0].href',
            Cell: row => <AddTraining saveTraining={saveTraining} customer={row.original}/>
        },
        {
            Header: 'First name',
            accessor: row => { return `${row.firstname}` },
            id: 12
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            width: 100,
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            width: 100,
            Header: 'City',
            accessor: 'city'
        },
        {
            sortable: false,
            filterable: false,
            width: 150,
            accessor: 'links[0].href',
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 150,
            accessor: 'links[0].href',
            Cell: row => <Button color='secondary' onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    )
}