import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, GridProps } from '@material-ui/core';
import Input from './Input';
import CheckBox from './CheckBox';


interface AppProps extends GridProps {
    layout: FormLayout[];
}

interface FormLayout extends GridProps {
    type: string;
    input: InputLayout[];
    checkBoxPrimary?: string | undefined;
    checkBoxSecondary?: string | undefined;
}

interface InputLayout{
    title?: string;
    btnText?: string | undefined;
    type?: string | undefined;
    placeHolder?: string;
}

export default function Form(props: AppProps) {
    
    const classes = useStyles();
    const { layout, spacing } = props;

    return (
        <Paper className={classes.paper}>
            <Grid container direction="column" spacing={spacing}>
                { layout ? layout.map((layer: FormLayout, ind) => {
                    if (layer.type === "row"){
                        return (
                            <Grid item container direction="row" spacing={layer.spacing} className={classes.formRow}>
                                { layer.input.map((inputField: InputLayout) => {
                                    return (
                                        <Grid item xs>
                                            <Input 
                                                label={inputField.title} 
                                                type={inputField.type} 
                                                placeHolder={inputField.placeHolder}
                                            />
                                        </Grid>
                                    )
                                }) }
                            </Grid>
                        )
                    }

                    if (layer.type === "column"){
                        return (
                            <Grid item>
                                { layer.input.map((inputField: InputLayout) => {
                                    return (
                                        <Grid>
                                            <Input label={inputField.title} type={inputField.type} placeHolder={inputField.placeHolder} />
                                        </Grid>
                                    )
                                }) }
                            </Grid>
                        )
                    }

                    if (layer.type === "checkbox"){
                        return (
                            <Grid item>
                                <CheckBox primary={layer.checkBoxPrimary} secondary={layer.checkBoxSecondary} />
                            </Grid>
                        )
                    }      
                }) : null }
            </Grid>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "1.6rem",
        width: "100%",
        maxWidth: "100%",

        [theme.breakpoints.down('md')]: {
           padding: "1.2rem"
        },
    },

    formRow: {
        [theme.breakpoints.down('md')]: {
            flexDirection: "column"
         },
    }
}));