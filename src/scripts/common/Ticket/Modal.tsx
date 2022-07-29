import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

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
        <Ticket />
    </React.Fragment>

    return ReactDOM.createPortal(Modal, document.body)
}