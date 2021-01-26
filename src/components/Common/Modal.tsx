import React, {ReactNode} from 'react';
import { withStyles, makeStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CustomButton from './CustomButton';


interface AppProps {
  title?: string;
  handleClose?(): void;
  modal: boolean;
  ButtonComponent?: Function; 
  type?: string;
  children: any;
}


export default function CustomizedDialogs(props: AppProps) {
  const classes = useStyles();
  const { title, handleClose, modal, 
    ButtonComponent, type, children } = props

  if (type === "fullscreen"){
    return (
      <Dialog fullScreen open={modal}>
        { children }
      </Dialog>
    )
  }

  if ( type === "noTitle" ){
    return (
    <Dialog open={modal}>
      { children }
    </Dialog>)
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={modal} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          { title }
        </DialogTitle>

        <DialogContent dividers>
          { children }
        </DialogContent>

        <DialogActions>
          <CustomButton handleClick={handleClose} text="Cancel"/>
          { ButtonComponent ? <ButtonComponent {...props} /> : 
          <CustomButton classes={classes.btnColored} handleClick={handleClose} text="Done" />}
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children?: ReactNode;
  onClose?(): void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  btnColored: {
    backgroundColor: '#0052CC',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0747A6',
    }
  },

}));
  
const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: 0,
    width: "100%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

