import React, {Component, useEffect, useState} from "react";
import { Button, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './UserList.css'
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../navbar/Navbar";
import {Link} from "react-router-dom";
import UserService from "../../service/UserService";

function UserList (){
    const [users, setUsers] = useState([]);
    const init = ()=> {
        UserService.getUsers().then(res => {
            console.log('Users Data ', res.data);
            setUsers(res.data);
        }).catch(error => {
            console.log("ERROR : " + error)
        })
    }

    useEffect(() => {
        init()
    }, []);

    const handleDelete = (id) => {
        console.log("On supprime celui là --> id : " + id)
        UserService.deleteUser(id).then((res) => {
            console.log("User supprimé --> " + res.data)
            init()
        }).catch(error => {
            console.log("ERROR : " + error)
        })

    }

        return(
            <div>

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
                                <th scope="col" width="40%">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.lastname}</td>
                                        <td>
                                            <Link to={`/users/update/${user.id}`}>
                                                <Button color="success" startIcon={<EditIcon />}  variant="contained">Modify</Button>
                                            </Link>
                                            {' '}
                                            <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </Paper>
                    <div className="row">
                        <Link to='/addUser'>
                            <Button  variant="contained"  fullwidth="true" startIcon={<AddIcon />}>Add</Button>
                        </Link>

                    </div>
                </div>

            </div>
        )

}


export default UserList;