import React, {useEffect} from "react";
import BrainlyAPI from "../../BrainlyAPI"

import Question from "./Question"

export default function Ticket(id){
    useEffect(() => {
        let data = BrainlyAPI.GetQuestion(id);
    })

    return(
        <div className="modal">
            <Question />
        </div>
    )
}