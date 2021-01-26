import React from 'react';
import { Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import { Button, Input } from 'rsuite';
import { observer } from 'mobx-react';

interface AppProps {
    handleClose(): void;
    handleDelete(): void;
    successMessage: string;
    errorMessage: string;
    loading: boolean;
    updatePassword?(value: string): void;
    title: string;
    subText?: string;
    password?: boolean
}

const SettingsDelete = (props: AppProps) => {
    const { handleClose, subText, title, successMessage, errorMessage, loading, updatePassword, handleDelete, password} = props;
   
    return (
        <div>
            <Grid container alignItems="center" direction="row" style={{padding: "0.6rem"}}>
                <Grid item xs>
                    <Typography variant="body2" style={{fontWeight: 600}}>{title}</Typography>
                </Grid>

                <Grid item>
                    <Close style={{cursor: "pointer"}} onClick={handleClose} />
                </Grid>
            </Grid>

            <Grid container direction="column" spacing={2} style={{padding: "1rem"}}>
                <Grid item>
                    <Grid container direction="column" spacing={2}>
                    
                    { successMessage ?
                        <Grid item>
                            <Alert severity="success">{successMessage}</Alert>
                        </Grid> : errorMessage ? <Grid item>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid> 
                    : null }

                    { password === true ? 
                        <Grid item>
                            <Typography variant="body2"> Enter your Password to continue: </Typography>
                            <Input type="password" onChange={updatePassword} />
                        </Grid>
                    : null }

                        <Grid item>
                            <Typography variant="body2">
                               {subText}
                            </Typography>
                        </Grid>
                    </Grid>           
                </Grid>
            </Grid>
            
            <Grid>
                <Grid item style={{padding: "0.6rem"}}>
                    <Grid container direction="row" alignItems="center" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Button onClick={handleClose} style={{backgroundColor: "#F5F5F5", borderColor: "#F5F5F5"}}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button loading={loading} style={{backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}} onClick={handleDelete}>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(SettingsDelete)
