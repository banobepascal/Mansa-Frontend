import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { Input, Button, Popover } from 'rsuite';
import { observer } from 'mobx-react';

interface AppProps {
    handleClose(): void;
    handleCreate(): void;
    value: string;
    handleInputChange(value: string): void;
    loading: boolean;
    errorMessage: string;
    successMessage: string;
    title: string;
}


const CreateList = (props: AppProps) => {
    const commonClass = CommonStyles();
    const { handleClose, handleCreate, handleInputChange, successMessage, errorMessage, loading, value, title } = props;

   
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
                            <Typography variant="body2">List name</Typography>
                            <Input value={value} onChange={handleInputChange} />
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                Use lists to save items for later. All lists are private unless you share them with others.
                            </Typography>
                        </Grid>
                    </Grid>           
                </Grid>
            </Grid>
            
            <Grid>
                <Grid item  style={{padding: "0.6rem"}}>
                    <Grid container direction="row" alignItems="center" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Button onClick={handleClose} style={{backgroundColor: "#F5F5F5", borderColor: "#F5F5F5"}}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button loading={loading} className={commonClass.btnBlue} style={{ background: "#0052CC", color: "#fff"}} onClick={handleCreate}>Create List</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(CreateList)
