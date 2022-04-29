export async function sendmsg(roomID, body, roomType){
    let token = localStorage.getItem("userAuth");
    await fetch(`https://brainlyus.ryver.com/api/1/odata.svc/${roomType}(${roomID})/Chat.PostMessage()`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +token
        },
        body: JSON.stringify({
        "createSource": {
            "avatar": "https://camo.githubusercontent.com/30eb9e12b3f4f08d458a18dd5357be53348530ad1be7ca65b422e07083445790/68747470733a2f2f636f6e746174746166696c65732e73332e75732d776573742d312e616d617a6f6e6177732e636f6d2f746e7432393834362f6e75476d4f73676856485539555a7a2f506173746564253230496d61676525334125323044656325323038253243253230323032312532302d2532303225334133392533413135616d",
            "displayName": "Brainly Companion"
        },
        "body":`${body}`                
        })
    });
}