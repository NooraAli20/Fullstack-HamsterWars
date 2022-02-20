import { Dialog } from '@mui/material';
import React from 'react';
import Form from './Form';

interface FormProps {
    open : boolean
    handleClose : () => void
}

const ModalDialog = (Props : FormProps) => {
    return (
        <Dialog open={Props.open} onClose={Props.handleClose}>
            <Form handleClose={Props.handleClose} />
        </Dialog>
    );
};

export default ModalDialog;