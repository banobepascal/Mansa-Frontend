import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import { tableData, TableDataProps, TableRowDataProps } from '../../../../data/data';
import Cell from '../../../Common/Table/Cell';
import CommonStyles from '../../../Common/CustomStyles';
import { Button } from 'rsuite';

const ComparisonTable = () => {
    const classes = useStyles();
    const commonStyles = CommonStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            { [1, 2, 3, 4, 5].map((value, index) => {
                                return (
                                    <TableCell align="left">
                                        <Grid container direction="column" style={{visibility: index === 0 ? "hidden" : "visible"}}>
                                            <Grid item>
                                                <div className={classes.images}>
                                                    <img style={{width: "100%"}} src="https://m.media-amazon.com/images/I/71trhuzbhML._AC_SS350_.jpg" alt="" />
                                                </div> 
                                            </Grid>
                                            <Grid item>
                                                <div style={{width: "100%"}}>
                                                    <Typography style={{wordWrap: "break-word", fontSize: 13, lineHeight: "19px"}} variant="body2">The Nike Joyride Dual Run blazes its own route. Tiny foam beads underfoot combined with traditional cushioning in the forefoot give an incredibly smooth feel that conforms to your foot.Shown: Pure Platinum/White/Racer Blue/Black Style: CD4365-011</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item style={{marginTop: 20}}>
                                                <Button className={commonStyles.btnBlack}>Add to Cart</Button>
                                            </Grid>
                                        </Grid>     
                                    </TableCell>
                                )
                            }) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { tableData.map((table: TableDataProps, ind) => {                     
                            return (
                                <TableRow>
                                    <Cell name={table.name} tableType="th" type="text"  />
                                    { table.data.map((row: TableRowDataProps, index: number) => {
                                        return (
                                            <Cell value={row.value} type={table.type}  />
                                        )
                                    }) }
                                </TableRow>
                            )
                        }) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },

    images: {
        width: 150
    }
});

export default ComparisonTable;

