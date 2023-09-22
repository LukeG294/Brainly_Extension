async function getData(){


    //let user_data = await fetch('https://brainly.com/api/28/api_user_profiles/get_by_id/16118329').then(data => data.json())
    //let id = user_data.data.id
    //let nick = user_data.data.nick
    let data = await fetch(`https://lgextension.azurewebsites.net/get_user/16118329`).then(data => data.json())
    // do something with response here, not outside the function
    console.log(data.permissions)
}

getData()