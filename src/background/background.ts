import storage from "@lib/storage";
import ext from "webextension-polyfill";

class Background {
	constructor() {
		this.Init();
	}

	private async Init() {
		await this.CheckIfAuthed();
	}

	private async CheckIfAuthed() {
		const userToken = await storage.get("authToken");

	}
	
}

new Background();