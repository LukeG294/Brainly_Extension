import storage from "@lib/storage";

import { extension_server_url } from "configs/config";
import ext from "webextension-polyfill";
import {
	Answer} from "../scripts/common/Content"

class Background {
	constructor() {
		this.Init();
	}

	private async Init() {
		chrome.runtime.onMessage.addListener( async function (request, sender, sendResponse) {
			console.log(request)
			switch (request.message) {
				case 'confirm':
					fetch(`${extension_server_url()}/confirm/?id=${request.data.id}&cookie=${request.data.cookie}`, {'mode': 'no-cors'})
					return;
				case 'add_user':
					const url = `${extension_server_url()}/add_user`;
					const data = `{
						"id":"${request.data.id}",
						"username":"${request.data.username}",
						"permissions":"${request.data.permissions}"
					}`;

					const response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: data
					});
					return;
				case 'remove_user':
					const url_remove = `${extension_server_url()}/delete_user/${request.data.id}`;
					const response_remove = await fetch(url_remove, {method: 'DELETE'});
					return;
				case 'edit_user':
					const url_edit = `${extension_server_url()}/edit_user`;
					const data_edit = `{"id":"${request.data.id}","newPermissions":"${request.data.permissions}"}`;
					const response_edit = await fetch(url_edit, {method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: data_edit});
					return;
				case 'add_verify':
					const add = `${extension_server_url()}/verification/add_request/${request.data.id}`;
					
					const responseAdd = await fetch(add, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(request.data.object)
					});
					return;
				case 'cancel_verify':
					const verify_remove = `${extension_server_url()}/verification/cancel/${request.data.id}`;
					await fetch(verify_remove, {method: 'DELETE'});
					return;
				case 'log_user_action':
					const logger = `${extension_server_url()}/verification/add_logs/${request.data.AnswerID}`;
					const logResp = await fetch(logger, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(request.data)
					});
					return;
			}
			
		})
		chrome.runtime.onUpdateAvailable.addListener((details) => {
			if (details) {
				chrome.runtime.reload();
			}
		});
	}
	
	
	

	
}

new Background();

