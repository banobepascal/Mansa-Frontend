import React, { ReactType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, SvgIconProps } from '@material-ui/core';
import { VerticalAlignTop, VerticalAlignBottom, NavigateBefore } from '@material-ui/icons';
import CustomButton from '../CustomButton';


interface AppProps {
    pageTitle: string;
    btnText?: string;
    btnIcon?: ReactType<SvgIconProps>;
    imprt?: boolean;
    exprt?: boolean;
    classes?: string; 
    classStyle?: any;
    bread?: string,
    breadLink?: string; 
    btnLink?: string; 
    handleNavClick?(): void
}



const DashHead = (props: AppProps) => {
    const classes = useStyles();
    const { pageTitle, btnIcon, handleNavClick, btnLink, btnText, bread, breadLink, imprt, exprt, classStyle } = props

    return (
        <div>
            <Grid container direction="column" alignItems="stretch">
                { bread ? 
                <Grid item>
                    <CustomButton link={breadLink} classes={classes.btnOutlined} text={bread} StartIcon={NavigateBefore} size="small" />
                </Grid> : null }
                
                <Grid item>
                    <Typography variant="h6" className={classes.title}>{pageTitle}</Typography>
                </Grid>
                <Grid item container direction="row" spacing={3} className={classes.dashIntro}>
                    <Grid container direction="row" item xs>
                        { exprt ? <Grid item><CustomButton StartIcon={VerticalAlignTop} classes={classes.btnTransparent} text="Export" size="small" /></Grid>: null }
                        { imprt ? <Grid item><CustomButton StartIcon={VerticalAlignBottom} classes={classes.btnTransparent} text="Import" size="small" /></Grid>: null }
                        
                    </Grid>
                    { btnText ? 
                    <Grid item>
                        <CustomButton size="small" handleClick={handleNavClick} link={btnLink} classes={classes.btnColored} text={btnText} StartIcon={btnIcon} />
                    </Grid> : null }
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '0 1rem',
        width: '100%',
    },

    rootTop: {
        marginTop: theme.spacing(2),
    },

    dashIntro: {
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
        }
    },

    title: {
        marginTop: theme.spacing(0),
        fontWeight: 550,
        lineHeight: '2.8rem'
    },

    btnColored: {
        backgroundColor: '#0052CC',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0747A6',
        }
    },

    btnTransparent: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: '#EBECF0',
            boxShadow: 'none',
        }
    },

    btnOutlined: {
        backgroundColor: 'transparent',
        border: '1px solid #C1C7D0',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#EBECF0',
            boxShadow: 'none',
        }
    }
}));

export default DashHead
