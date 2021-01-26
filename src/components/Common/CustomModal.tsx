import React, { useEffect } from 'react';
import { Loader, Button, Icon, Popover, Whisper, Modal, CheckPicker } from 'rsuite';
import { makeStyles } from '@material-ui/core';

interface AppProps {
    title?: string;
    handleClose?(): void;
    modal: boolean;
    type?: string;
    children: any;
}


const CustomModal = (props: AppProps) => {
    const classes = useStyles();
    const { title, handleClose, modal, type, children } = props
  

    if (type === "fullscreen"){
        return (
          <Modal full show={modal} className={classes.modalContainer}>
            { children }
          </Modal>
        )
      }
    
      if ( type === "noTitle" ){
        return (
        <Modal show={modal} className={classes.modalContainer}>
          { children }
        </Modal>)
      }

   
    return (
        <div>
           <Modal backdrop={true} show={modal} onHide={handleClose} className={classes.modalContainer}>
                <Modal.Header>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary">
                    Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
             </Modal>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({

  modalContainer: {
      [theme.breakpoints.down(650)]: {
        width: 400
      },

      [theme.breakpoints.down(420)]: {
        width: 350
      },

      [theme.breakpoints.down(380)]: {
        width: 300
      }
  }

}));

export default CustomModal;
