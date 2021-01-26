import React from 'react'
import styled from 'styled-components'
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';



interface AppProps {
    className?: string;
    checked?: boolean;
    primary?: string
    secondary?: string
}

interface StyledCheckboxProps {
    checked?: boolean;
}

interface HiddenCheckboxProps {
    checked?: boolean;
}

const CheckBox = ({ className, checked, secondary, primary, ...props }: AppProps) => {
    const classes = useStyles();

    return (
        <Grid>
            <Grid container direction="row" alignItems={!secondary ? "center" : "flex-start"} className={classes.container}>
                <Grid item>
                    <CheckboxContainer className={className} style={{cursor: "pointer"}}>
                        <HiddenCheckbox checked={checked} {...props} />
                        <StyledCheckbox checked={checked} />                
                    </CheckboxContainer>
                </Grid>
                <Grid item style={{marginLeft: 8}}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="body2">{primary}</Typography>
                        </Grid>
                        { secondary ? <Grid item>
                            <Typography variant="body2">{secondary}</Typography>
                        </Grid> : null }
                    </Grid>
                </Grid>  
            </Grid>
        </Grid>
    )
}

const StyledCheckbox = (props: StyledCheckboxProps) => {
    const { checked } = props;
     
    return (
        <div style={{
            display: "inline-block",
            width: 18,
            height: 18,
            background: checked ? '#0052CC' : 'transparent',
            border: checked ? "none" : "1px solid #C1C7D0",
            borderRadius: "3px",
            transition: "all 150ms",
        }}>
            <Icon checked={checked} />
        </div>
    )
}

const HiddenCheckbox = (props: HiddenCheckboxProps) => {
    return (
        <input 
            type="checkbox"
            style={{
                border: 0,
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                margin: -1,
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                whiteSpace: "nowrap",
                width: 1,
            }} 
        />
    )
}

const Icon = (props: { checked?: boolean }) => {
    const { checked } = props;

    return (
        <svg viewBox="0 0 24 24" style={{
            fill: "none",
            stroke: "white",
            strokeWidth: 2,
            visibility: checked ? 'visible' : 'hidden'
        }}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        flexWrap: "nowrap",
        [theme.breakpoints.down(600)]: {
           alignItems: "unset",
        },
    },
  }),
);

export default CheckBox;
