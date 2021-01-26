import React, { ChangeEvent, ComponentType } from 'react';
import CreatableSelect from 'react-select/creatable';
import { OutlinedInput, Typography, InputAdornment, TextField, Link, Grid } from '@material-ui/core';
import { Input as InputC } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


interface AppProps {
    label?: string;
    id?: string;
    placeHolder?: string;
    startText?: string;
    handleClick?(): void | undefined,
    handleChange?(event?: ChangeEvent<any>): void,
    StartIcon?: any
    EndIcon?: any
    titleColor?: string;
    selectorData?: any[];
    stateText?: string;
    type?: string;
    classes?: string;
    endText?: string;
    helperText?: string;
    ButtonComponent?: ComponentType<any>;
    formType?: "dropdown" | "selectable";
    labelColor?: string;
    multiline?: boolean
}


const Input = (props: AppProps) => {
    const classStyles = useStyles();
    const { label, placeHolder, startText, handleClick, handleChange,
        StartIcon, EndIcon, labelColor, selectorData, stateText,
        type, classes, endText, id, formType, multiline } = props
    
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="body2" style={{color: labelColor}}>
                        <Link color="inherit" style={{cursor: "pointer", textDecoration: "none"}}>{label}</Link>
                    </Typography>
                </Grid>

                <Grid item>
                    <Grid className={classStyles.styling}>
                        { formType === "dropdown" ? 
                            <TextField
                                id={id}
                                onClick={handleClick}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                size="small"
                                variant="outlined"
                                fullWidth
                                className={classes}
                                > 
                                { selectorData ? selectorData.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )) : null}
                            </TextField> 

                        : formType === "selectable" ? 
                            <CreatableSelect
                                isMulti
                                isClearable
                                // onChange={handleChange}
                                // options={options}
                            /> 
                        : 
                            <OutlinedInput
                                multiline={multiline}
                                id={id}
                                value={stateText}
                                onChange={handleChange}
                                fullWidth 
                                margin="dense" 
                                placeholder={placeHolder} 
                                type={type}
                                className={`${classes} ${classStyles.inputBase}`}
                                startAdornment={
                                    <InputAdornment position="start">
                                        { StartIcon ? (<StartIcon size="small" style={{color: "#8993A4"}} />) : startText ? 
                                        <Typography variant="body2" style={{color: "#8993A4"}}>{startText}</Typography> : null }
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        { EndIcon ? (<EndIcon size="small" style={{color: "#8993A4"}} />) : endText ?
                                        <Typography variant="body2" style={{color: "#8993A4"}}>{endText}</Typography> : null    
                                        }
                                    </InputAdornment>
                                }
                            /> }
                    </Grid>
                </Grid>
            </Grid>
        </div>  
    )
}

const useStyles = makeStyles((theme) => ({
    styling: {
        display: 'flex',
        flexDirection: 'row',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C1C7D0',
        },
        '& .MuiOutlinedInput-marginDense': {
            borderColor: "red"
        }
    },
    
    btnStyles: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: '1px solid #C1C7D0',
        borderLeft: 'none',
        borderRadius: '0 0.3rem 0.3rem 0',
        width: '30%',
        '&:hover': {
            boxShadow: 'none',
        }
    },

    inputBase: {
        height: "40px"
    },
}));

export default Input;