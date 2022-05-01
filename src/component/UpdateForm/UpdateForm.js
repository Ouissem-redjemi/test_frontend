import React, {useState} from "react";
import {
    Box,
    Button, Container,
    Grid, Modal, Paper, TextField
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
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

function UpdateForm({id,first,last,open}){
    const [ouvert, setOpen] = useState(open);
    const handleClose = () => setOpen(false);
    const [first_name,setFirstName] = useState(first);
    const [lastname,setLastName] = useState(last);
    const handleClick = (e) => {
        e.preventDefault()
        const user ={first_name,lastname}
        console.log(user)
        fetch(`http://localhost:8080/user/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("Utilisateur modifié")
            handleClose();

        })
    }
    return(
                <Container component="main" maxWidth="sm">
                    <Paper elevation={3}>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="first_name"
                                        required
                                        fullWidth
                                        label={first_name}
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleClick}
                            >
                                Update
                            </Button>
                        </form>
                    </Paper>
                </Container>


    )
}

export default UpdateForm;