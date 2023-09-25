import storage from "@lib/storage";
import ext from "webextension-polyfill";

class Background {
	constructor() {
		this.Init();
	}

	private async Init() {
		chrome.runtime.onMessage.addListener( async function (request, sender, sendResponse) {
			console.log(request)
			switch (request.message) {
				case 'confirm':
					fetch(`https://lgextension.azurewebsites.net/confirm/?id=${request.data.id}&cookie=${request.data.cookie}`, {'mode': 'no-cors'})
					return;
				case 'add_user':
					const url = 'https://lgextension.azurewebsites.net/add_user';
					const data = `{"id":"${request.data.id}","username":"${request.data.username}"}`;

					const response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: data
					});
					return;
				case 'remove_user':
					const url_remove = `https://lgextension.azurewebsites.net/delete_user/${request.data.id}`;
					const response_remove = await fetch(url_remove, {method: 'DELETE'});
					return;
				case 'edit_user':
					const url_edit = `https://lgextension.azurewebsites.net/edit_user`;
					const data_edit = `{"id":"${request.data.id}","newPermissions":"${request.data.permissions}"}`;
					const response_edit = await fetch(url_edit, {method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: data_edit});
					return;
			}
			
		})
	
	}
	
	
	

	
}

new Background();

