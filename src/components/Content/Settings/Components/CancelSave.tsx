import React from 'react'
import { Grid } from '@material-ui/core'
import CommonStyles from '../../../Common/CustomStyles'
import { Button } from 'rsuite'

interface AppProps {
    handleCancel?(): void,
    handleSave?(): void,
    loading?: boolean;
    type?: string;
}

const CancelSave = (props: AppProps) => {
    const {handleCancel, handleSave, loading, type} = props;
    const commonClass = CommonStyles();

    if (type === "save") {
        return (
            <Grid item style={{display: "flex", justifyContent: "flex-end"}}>
                <Button className={commonClass.btnTransparentBlack} style={{ background: "transparent", color: "#15141b"}} onClick={handleSave} loading={loading}>Save</Button>
            </Grid>
        )
    }

    return (
        <div>
            <Grid container direction="row" spacing={2} justify="flex-end">
                <Grid item>
                    <Button className={commonClass.btnBlack} style={{ background: "#15141b", color: "#fff"}} onClick={handleCancel}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button className={commonClass.btnTransparentBlack} style={{ background: "transparent", color: "#15141b"}} onClick={handleSave} loading={loading}>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CancelSave
