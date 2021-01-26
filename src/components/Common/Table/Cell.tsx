import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


interface AppProps {
    type: "rating" | "text";
    value?: any;
    tableType?: string;
    name?: string;
}

const Cell = (props: AppProps) => {
    const { type, value, tableType, name } = props;

    if ( tableType === "th" ){
        return (
            <TableCell component="th" scope="row">
                <Typography variant="body2" style={{fontWeight: 600, fontSize: 13, lineHeight: "19px"}}>
                    { name }
                </Typography>
            </TableCell>
        )
    }

    if ( type === "rating" ) {
        return (
            <TableCell>
                <Box component="small" borderColor="transparent">
                    <Rating size="small" name="pristine" value={value} />
                </Box>
            </TableCell>
        )
    }

    if ( type === "text" ) {
        return (
            <TableCell>
                <Typography variant="body2" style={{fontSize: 13, lineHeight: "19px"}}>
                    { value }
                </Typography>
            </TableCell>
        )
    }

    return (
        <TableCell>
            Nothing here
        </TableCell>
    )
}

export default Cell
