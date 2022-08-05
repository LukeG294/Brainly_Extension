import React from "react";

export default function Attachments({attachments}){
    if(attachments.length){
        return(
            <div className = "attachments">
                <div className = "attachment-view">
                    <img src={attachments[0].full} alt="" />
                </div>
                {/* <div className="attachments-panel">
                    { 
                        attachments.map((attachment,index)=>{
                            return (
                                <div key={index} className="attachment-item">
                                    <img src={attachment.thumbnail} alt={attachment.id}/>
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>
        )
    }
}