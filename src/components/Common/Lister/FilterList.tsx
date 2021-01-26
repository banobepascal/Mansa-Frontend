import React, { useState, MouseEvent, ChangeEvent } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Checkbox, FormControlLabel, Collapse, Divider,
    List, Grid, ListItem, FormGroup, ListItemText, Typography } from '@material-ui/core';
import CustomButton from '../CustomButton';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface AppProps {
    anchor: Anchor; 
    toggleDrawer(achor: Anchor, bool: boolean): any; 
    filters: Array<object>; 
    handleClick(event: MouseEvent<Element, MouseEvent> | MouseEvent<any>, entry: string): void;
    open?: string;
}


export default function FilterList(props: AppProps) {
    const classes = useStyles();
    const { anchor, toggleDrawer, filters, handleClick, open } = props;
    const [check, setCheck] = useState<any>({});
    const [checkedValue, setCheckedValue] = useState<Array<any>>([]); 

    const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, entry1: any, entry2: any) => {
        setCheck({ ...check, [event.target.name]: event.target.checked })

        for(let i=0; i<checkedValue.length; i++){
            if (checkedValue[i].label === entry2.label && checkedValue[i].value === entry1.value){
                checkedValue.splice(i, 1);
            }
        }
        
        setCheckedValue([...checkedValue, {
            value: entry1.value, label: entry2.label, 
            checkbox: event.target.checked, number: entry1.number }])
    };

    const handleClear = (entry1: any) => {
        for (let i=0; i<entry1.data.length; i++){
            setCheck({[`checked${entry1.data[i].number}`]: false })
        }

        checkedValue.map((element, index) => {
            for (let i=0; i<entry1.data.length; i++){
                if (entry1.data[i].number === element.number){
                    checkedValue.splice(index, 1);
                }
            }
        })
    }

    return (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
           <div className={classes.toolbar}>
                <Typography variant="h6" noWrap>
                    More filters
                </Typography>
            </div>
            <Divider />

            <div className={classes.listerDiv}>
                { filters ? filters.map((entry1: any, key) => {
                    return (
                    <List disablePadding>
                        <ListItem button onClick={(event) => handleClick(event, entry1.label)} key={key} className={classes.listType}>
                            <Grid container direction="column">
                                <Grid item>
                                    <ListItemText primary={entry1.label} classes={{ primary: classes.listText}} />
                                </Grid>
                                { open === entry1.label ? null : <Grid item className={classes.checkValues}>
                                    <Typography variant="body2">
                                    { checkedValue.map((element: any) => {
                                        if(entry1.label === element.label && element.checkbox === true){
                                            return `${element.value}, `
                                        }  
                                        return null
                                    })}
                                </Typography>
                                </Grid> }
                                
                            </Grid>
                            {open === entry1.label ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open === entry1.label ? true : false} timeout="auto" unmountOnExit>
                            <FormGroup className={classes.nested}>
                                {entry1.data.map((text: any) => {
                                    return (<FormControlLabel
                                        control={
                                        <Checkbox 
                                            size="small"
                                            checked={!check[`checked${text.number}`] ? false : check[`checked${text.number}`]}  
                                            onChange={(event) => handleCheckBoxChange(event, text, entry1)}
                                            name={`checked${text.number}`} 
                                            color="primary"
                                        />}
                                        label={text.value}
                                    />)})}
                                <CustomButton handleClick={() => handleClear(entry1)} size="small" classes={classes.nestedBtn} text="Clear" />
                            </FormGroup>
                        </Collapse>
                    </List>)
                }): null }
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    list: {
        width: 350,
    },

    listText: {
        // fontWeight: "normal",     
    },

    listType: {

    },

    fullList: {
        width: 'auto',
    },

    listerDiv: {
        paddingTop: 0,
    },

    toolbar: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },

    checkValues: {
        backgroundColor: "#dfe3e8;",
        color: "#212b36",
        fontWeight: 500,
        border: "none",
        fontSize: "1.2rem",
        lineHeight: "1.8rem",
        display: "inline-flex",
        alignItems: "center",
        padding: "0 .8rem",
        borderRadius: "2rem"
    },  

    nested: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        '& .MuiTypography-body1': {
            fontSize: "14px",
        },

        '& .PrivateSwitchBase-root-74': {
            padding: 6
        }
    },

    nestedBtn: {
        backgroundColor: 'transparent',
        textTransform: "none", 
        color: "#0052CC",
        borderColor: "#0070f3",
        boxShadow: 'none',
        marginTop: theme.spacing(2),
        '&:hover': {
            backgroundColor: 'transparent',
            border: '1px solid #0052CC',
            boxShadow: 'none',
        }
    },
}));