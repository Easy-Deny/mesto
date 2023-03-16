import { profileName, profileDescription } from "../index.js";
export default class UserInfo {
    constructor(name, description) {
        this.user = {
            name: name,
            description: description
        }
    }
    getUserInfo() {
        return user ={
            name:profileName.textContent,
            description: profileDescription.textContent
        }
    }
    setUserInfo() {
        profileName.textContent = this.user.name;
        profileDescription.textContent = this.user.description;
    }
}
