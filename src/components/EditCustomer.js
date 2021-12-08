import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import AppBar from '@mui/material/AppBar';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => {
        
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer,[event.target.id] :event.target.value})
    }

    const updateCustomer = () => {
        console.log('updateCustomer in EditCustomer.js');
        console.log('The customer is: ');
        console.log(customer);
        props.updateCustomer(customer,props.customer.links[0].href)
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        label="First name"
                        value = {customer.firstname}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last name"
                        value = {customer.lastname}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        value = {customer.email}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        label="Street address"
                        value = {customer.streetaddress}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        label="Post code"
                        value = {customer.postcode}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        label="City"
                        value = {customer.city}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone number"
                        value = {customer.phone}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}