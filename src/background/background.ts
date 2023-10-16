import storage from "@lib/storage";
import {Question} from "../scripts/common/Content";

import { extension_server_url, parseQuestionLink } from "configs/config";
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
		//quick Deletes
		let protected_questions = ["27895906", "25905808", "24854004", "24482719", "24253401", "24138471", "22980813", "22935328", "22853268", "22664703", "22648807", "22646458", "22591162", "22466888", "22465617", "22390777", "22382751", "22354424", "21859260", "21669499", "20255339", "20201043", "25440606", "25440557", "25440019", "16416100", "16252198", "16252032", "16251764", "16251566", "16060223", "16060199", "16060079", "13552735", "13159860", "12931980", "11240576", "11009071", "10896874", "10455490", "10455307", "10431677", "10431583", "10401730", "9966806", "9754427", "9535927", "13670458", "13670450", "13670435", "13407940", "12502683", "12502568", "11655124", "11240099", "4802430", "4725487", "4701650", "4700642", "4694590", "1310090", "1283147", "1256777"]
		let reason_append = await fetch(`${extension_server_url()}/preset_messages/ext_action_note`).then(data => data.json())
		let menu_ids = []
		async function getReasons(id){
			let reasons = await fetch('https://brainly.com/api/28/moderation_new/get_content', {
				method: "POST",
				body: (`{"model_type_id":1,"model_id":${ id },"schema":"moderation.content.get"}`)
			}).then(data => data.json())

			reasons = reasons.data.delete_reasons.task 

			for (let i = 0; i < reasons.length; i++) {
				const element = reasons[i];
				let subcategories = element.subcategories
				for (let index = 0; index < subcategories.length; index++) {
					const e = subcategories[index];
					menu_ids.push({"id":""+i+"-"+index+"", "reasonText":""+e.text+"", "title":e.title})
				}
			}

			fetch(`https://brainly.com/api/28/moderate_tickets/expire`, {
				method: "POST",
				body: `{"model_id":${ id },"model_type_id":1,"schema":"moderation.ticket.expire"}`
			});
			return reasons
		}
		
		

		async function deletionHandler(info,tab) {
			let id = parseQuestionLink(info.linkUrl)
			
			if (!info.menuItemId.includes("-")) {
				return;
			} else {
				const result = menu_ids.filter(obj => {
					return obj.id === info.menuItemId
				});
				console.log(result[0]);
				(async () => {
					const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
					const response = await chrome.tabs.sendMessage(tab.id, {reason: result[0].title, element: info.linkUrl});
					// do something with response here, not outside the function
					if (response.confirmed){
						let reason = result[0].reasonText + " " + reason_append[0].text
						let warn = response.warn
						let take_point = false
						let give_points = false

						let r = await fetch ('https://brainly.com/api/28/moderation_new/delete_task_content', {
							method: "POST",
							body: JSON.stringify({
								"reason_id":2,
								"reason": reason, //deletion reason
								"give_warning":warn,
								"take_points": take_point, //asker's points
								"schema":`moderation.task.delete`,
								"model_type_id":1,
								"model_id":id, //question id
								"give_points": give_points //respondent's points
							})
						}).then(data => data.json());
					}
				  })();
				
				
				
				
			} 
		}
		function makeMenu(name, id){
			chrome.contextMenus.create({
				title: name, 
				contexts:["selection"], 
				id: id
			});
		}
		let rnum = Math.floor(Math.random() * protected_questions.length);
		let random_id = protected_questions[rnum]
		let reasons = await getReasons(random_id)
		for (let i = 0; i < reasons.length; i++) {
			const element = reasons[i];
			let subcategories = element.subcategories
			for (let index = 0; index < subcategories.length; index++) {
				const e = subcategories[index];
				makeMenu(e.title, `${i}-${index}`)
			}
		}
		chrome.contextMenus.onClicked.addListener(deletionHandler)
		
	}
	
	
	

	
}

new Background();

