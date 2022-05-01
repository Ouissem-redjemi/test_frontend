import React, {useState} from "react";
import { Button, Container,
    Grid, Paper, styled, TextField} from "@mui/material";
import {purple} from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';

function Form(){
    const [first_name,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));
    const paperStyle ={padding:'10px 20px', width:600, margin :'20px auto', borderRadius:'20px'};
    const handleClick = (e) => {
        e.preventDefault()
        const user ={lastname, first_name}
        console.log(user)
        fetch("http://localhost:8080/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("Nouvel utilisateur")
        })
    }
    return(
            <Container component="main" maxWidth="sm">
                <Paper elevation={3} style={paperStyle}>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="first_name"
                                    required
                                    fullWidth
                                    label="FirstName"
                                    value={first_name}
                                    onChange={(name)=>setFirstName(name.target.value)}                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <ColorButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            endIcon={<SendIcon />}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                        >
                            Add
                        </ColorButton>
                    </form>
                </Paper>
                </Container>
    )
}

export default Form;