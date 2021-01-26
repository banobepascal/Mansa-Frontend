import React, { ReactType } from 'react';
import { Button, SvgIconProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


interface AppProps {
    text?: string;
    handleClick?(event?: any, entry?: any): void;
    classes?: string;
    StartIcon?: ReactType<SvgIconProps>;
    EndIcon?: any;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    link?: string;
    style?: any;
    type?: any;
}

const CustomButton = (props: AppProps) =>  {
    const defaultCss = useStyles();

    const { text, link, classes, StartIcon, EndIcon, handleClick, size, disabled, style, type } = props;

    return (
        <Button
            onClick={handleClick}
            href={link} 
            className={`${classes ? classes : null} ${defaultCss.styling}`}
            startIcon={StartIcon ? <StartIcon /> : null}
            endIcon={EndIcon ? <EndIcon /> : null}
            size={size}
            variant="contained"
            disabled={disabled}
            style={style}
            type={type}
        >
            { text }
        </Button>
    )
}

const useStyles = makeStyles((theme) => ({
    styling: {
        textTransform: "none",
        height: "40px",
        boxShadow: "none",
    }
}));

export default CustomButton