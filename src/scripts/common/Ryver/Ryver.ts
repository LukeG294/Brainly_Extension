import Notify from "scripts/common/Notifications/Notify";

export default new class Ryver{
  private extIcon = "https://camo.githubusercontent.com/30eb9e12b3f4f08d458a18dd5357be53348530ad1be7ca65b422e07083445790/68747470733a2f2f636f6e746174746166696c65732e73332e75732d776573742d312e616d617a6f6e6177732e636f6d2f746e7432393834362f6e75476d4f73676856485539555a7a2f506173746564253230496d61676525334125323044656325323038253243253230323032312532302d2532303225334133392533413135616d";
  private token = localStorage.getItem("userAuth");

  async Message(
    roomID: string, 
    body: string, 
    roomType: "workrooms" | "forums",
    defaultUser?: boolean
  ){
    let fetchBody;
    if(defaultUser){
      fetchBody = JSON.stringify({
        "body":body
      })
    }else{
      fetchBody = JSON.stringify({
        "createSource": 
          {
            "avatar": this.extIcon,
            "displayName": "Brainly Companion"
          },
        "body":body
      })
    }
    await fetch(`https://brainlyus.ryver.com/api/1/odata.svc/${roomType}(${roomID})/Chat.PostMessage()`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +this.token
        },
        body: fetchBody
    })
  }

  async Task(
    subject:string, 
    content:string, 
    boardID:number, 
    categoryID:number, 
    defaultUser?: boolean
    ){
      let fetchRaw = JSON.stringify({
        "subject": subject,
        "body": content, 
        "createSource": 
        {
          "avatar": this.extIcon,
          "displayName": "Brainly Companion"
        },
        "category": {
          "id": categoryID
          //1000306
        },
        "board": {
          "id": boardID
          //1000010
        }
      })
      if(defaultUser){
        fetchRaw = JSON.stringify({
          "subject": subject,
          "body": content,
          "category": {
            "id": categoryID
            //1000306
          },
          "board": {
            "id": boardID
            //1000010
          }
        })
      }
    
    var requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' +this.token
      },
      body: fetchRaw
    };
    
    await fetch("https://brainlyus.ryver.com/api/1/odata.svc/tasks", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async getBoardTasks(boardID:string){
    return await fetch(`https://brainlyus.ryver.com/api/1/odata.svc/workrooms(${boardID})/TaskBoard.Get()`, {
      headers: {
        Authorization: "Basic " + this.token
      }
    })
    .then(data => data.json())
  }

}