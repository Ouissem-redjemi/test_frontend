import React, {Component, useEffect, useState} from "react";
import {
    Button, Container,
    Grid, Paper, styled, TextField
} from "@mui/material";
import {purple} from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {useNavigate, useParams} from "react-router";
import UserService from "../../service/UserService";
import '../list/UserList.css';

const paperStyle ={padding:'10px 20px', width:600, margin :'20px auto', borderRadius:'20px'};
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));
function AddUser(){
    const [first_name,setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const navigate = useNavigate()
    const {id} = useParams();

    const createUser = (e) => {
        e.preventDefault();
        const user = {first_name,lastname,id}
        console.log(id)
        console.log(first_name)
        console.log(lastname)
        if(id){ //S'il existe déjà, on modifie
            UserService.updateUser(user).then((res) => {
                console.log('User mis à jour --> ', res.data)
                navigate('/')
            }).catch(error => {
                console.log("ERROR : " + error)
            })
        }else { //Sinon, on créé un nouvel utilisateur
            UserService.createUser(user).then((res) => {
                console.log('User créé avec succès ---> ' , res.data)
                navigate('/')
            }).catch(error => {
                console.log("ERROR : " + error)
            })
        }
    }

    useEffect(() => {
        if(id){ //si l'utilisateur existe déjà
            UserService.getUser(id).then((res) => {
                setFirstName(res.data.first_name);
                setLastName(res.data.lastname);
            }).catch(error => {
                console.log("ERROR : " + error)
            })
        }
    }, [])
        return (
            <Container component="main" maxWidth="sm" style={{paddingTop: '50px'}}>
                <h3>Add User</h3>
                <Paper elevation={3} style={paperStyle}>
                    <form>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="first_name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    placeholder={first_name}
                                    label="First Name}"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastname"
                                    id="lastname"
                                    placeholder={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <ColorButton
                            type="submit"
                            variant="contained"
                            endIcon={<SendIcon />}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => createUser(e)}
                        >
                            save
                        </ColorButton>
                        {' '}
                        <Link to={"/"} style={{textDecoration: 'none'}}>
                            <Button type="submit"
                                    variant="contained"
                                    endIcon={<DeleteIcon />}
                                    sx={{ mt: 3, mb: 2 }}> return</Button>
                        </Link>

                    </form>
                </Paper>
            </Container>


        )

}

export default AddUser;