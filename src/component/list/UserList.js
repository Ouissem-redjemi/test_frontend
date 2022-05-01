import React, { useEffect, useState} from "react";
import {Box, Button, Modal, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './UserList.css'
import Form from "../form/Form";
import AddIcon from '@mui/icons-material/Add';
import UpdateForm from "../UpdateForm/UpdateForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'20px',
    boxShadow: 24,
    p: 4,
};



function UserList(){
    const [open, setOpen] = React.useState(false);
    const [ouverture, setOuverture] = React.useState(false);
    const[users,setUser]=useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onClickModal = () => setOuverture(true);
    const onCloseModal= () => setOuverture(false);

    useEffect(()=>{
        fetch("http://localhost:8080/user/users")
            .then(res=>res.json())
            .then((result)=>{
                    setUser(result);
                }
            )
    },[])
    return(
        <div className="container">
            <Paper elevation={3}>
            <div className="row">
                <h2>List Users</h2>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user=>(
                    <tr key={user.id}>
                        <td>{user.first_name}</td>
                        <td>{user.lastname}</td>
                        <td>
                            <Button color="success" startIcon={<EditIcon />}  variant="contained"  onClick={onClickModal}>Modify</Button>
                            <Modal
                                open={ouverture}
                                onClose={onCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <h3>Update User by id </h3>
                                    <UpdateForm id={user.id} first={user.first_name} last={user.lastname} open={open}/>
                                </Box>
                            </Modal>
                            {' '}
                            <Button variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
                </Paper>
            <div className="row">
                <Button onClick={handleOpen} variant="contained"  startIcon={<AddIcon />}>Add</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h3>Add User</h3>
                        <Form/>
                    </Box>
                </Modal>
            </div>
        </div>

    )
}

export default UserList;