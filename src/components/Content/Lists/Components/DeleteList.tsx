import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core'
import CustomButton from '../../../Common/CustomButton'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { useStore } from '../../../../store/useStore';
import { Input, Button, Popover } from 'rsuite';
import { observer } from 'mobx-react';

interface AppProps {
    handleClose(): void;
    handleDeleteList(): void;
    value: string;
    handleInputChange(value: string): void;
    loading: boolean;
    errorMessage: string;
    successMessage: string;
    activeList: any[];
    enabled: boolean;
    title: string;
}


const DeleteList = (props: AppProps) => {
    const { handleClose, handleDeleteList, handleInputChange, successMessage, errorMessage, loading, value, activeList, enabled, title } = props;
   
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

                        <Grid item>
                            <Typography variant="body2">Confirm you want to delete this list by typing its ID: <strong>{activeList}</strong> </Typography>
                            <Input value={value} onChange={handleInputChange} />
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                Once deleted, list is not retrievable
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
                            <Button loading={loading} style={{backgroundColor: "#DE350B", borderColor: "#DE350B"}} onClick={handleDeleteList} disabled={enabled}>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(DeleteList)
