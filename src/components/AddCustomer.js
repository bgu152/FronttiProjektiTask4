import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import AppBar from '@mui/material/AppBar';


import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';

export default function AddCustomer(props) {
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer,[event.target.id] :event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer)
        handleClose();
    }


    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
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
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}