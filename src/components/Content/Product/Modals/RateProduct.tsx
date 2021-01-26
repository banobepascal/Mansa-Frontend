import React, { useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { Input, Button, Popover, Rate } from 'rsuite';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';

interface AppProps {
    handleClose(): void;
}


const RateProduct = (props: AppProps) => {
    const { handleClose} = props;
    const store = useStore();
    const {saveLoading, errorMessage, successMessage, rating, setRating, submitRating} = store.productsStore;

    useEffect(() => {
        if(successMessage){
            handleClose()
        }
    }, [successMessage, handleClose]);
    return (
        <div>
            <Grid container alignItems="center" direction="row" style={{padding: "0.6rem"}}>
                <Grid item xs>
                    <Typography variant="body2" style={{fontWeight: 600}}>Rate product</Typography>
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
                            <Grid item>
                                <Box component="small" borderColor="transparent">
                                    <Rate size="sm" onChange={setRating} value={rating} max={5} readOnly={false}/>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                Give the product a rating
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
                            <Button loading={saveLoading} className={CommonStyles().btnBlue}  style={{ background: "#0052CC", color: "#fff"}} onClick={submitRating}>Rate</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(RateProduct)
