import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from "./Components/Backdrop"

export interface ModalProps{
    id:string;
    isVT: boolean;
    toAnswer?: string;
}
export const modal:FunctionComponent<ModalProps> = ({
    id,
    isVT,
    toAnswer
}) => {
    let Modal = 
    <React.Fragment>
        <Backdrop />
        
    </React.Fragment>

    return Modal
}