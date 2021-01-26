import React from 'react';
import { Grid, Typography, InputLabel, FormControl } from '@material-ui/core'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { Input, Button, Popover, CheckPicker } from 'rsuite';
import { observer } from 'mobx-react';

interface AppProps {
    title: string;
    handleClose(): void;
    loading: boolean;
    errorMessage: string;
    successMessage: string;
    data: any[];
    handleAddToList(): void;
    value?: any[];
    handleInputChange?(value: any[]): void;

}


const AddToList = (props: AppProps) => {
    const commonClass = CommonStyles();
    const { handleClose, handleInputChange, loading, successMessage, errorMessage, data, handleAddToList, value, title } = props;

   
    return (
        <div>
            <Grid container alignItems="center" direction="row">
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
                        <CheckPicker
                            data={data}
                            appearance="default"
                            placeholder="Default"
                            value={value}
                            onChange={handleInputChange}
                            style={{ width: "100%" }}
                            />
                        </Grid>

                    </Grid>           
                </Grid>
            </Grid>
            
            <Grid>
                <Grid item>
                    <Grid container direction="row" alignItems="center" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Button onClick={handleClose}  style={{backgroundColor: "#F5F5F5", borderColor: "#F5F5F5"}}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleAddToList} loading={loading} className={commonClass.btnBlue} style={{ background: "#0052CC", color: "fff"}}>Save</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(AddToList)
