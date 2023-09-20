import storage from "@lib/storage";
import ext from "webextension-polyfill";

class Background {
	constructor() {
		this.Init();
	}

	private async Init() {
		chrome.runtime.onMessage.addListener( async function (request, sender, sendResponse) {
			switch (request.message) {
				case 'confirm':
					fetch(`https://lgextension.azurewebsites.net/confirm/?id=${request.data.id}&cookie=${request.data.cookie}`, {'mode': 'no-cors'})
					return;
				case 'get_permissions':
					let data = await fetch(`https://lgextension.azurewebsites.net/get_user/${request.data.id}`).then(data => data.json())
					sendResponse(data);
					return true;
			}
			
		})
	}
	
	
	

	
}

new Background();

