import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from "./Components/Backdrop"
import Ticket from "./Components/Ticket"

export interface ModalProps{
    id:string;
    toAnswer?: string;
}
export const modal:FunctionComponent<ModalProps> = ({
    id,
    toAnswer
}) => {
    let Modal = 
    <React.Fragment>
        <Backdrop />
        <Ticket />
    </React.Fragment>

    return ReactDOM.createPortal(Modal, document.body)
}