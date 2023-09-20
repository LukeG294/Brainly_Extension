async function getData(){


    let user_data = await fetch('https://brainly.com/api/28/api_user_profiles/get_by_id/16118329').then(data => data.json())
    let id = user_data.data.id
    let nick = user_data.data.nick


    chrome.runtime.sendMessage({data: {"id":id,"username":nick}, message:"get_permissions"}, function (response) {console.log(response + chrome.runtime.lastError.message)});
}

getData()