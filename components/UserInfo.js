export default class UserInfo {
  constructor({ profileName, profileAbout}) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._about.textContent
    }
  }    

  setUserInfo({ userName, userAbout}) {
    this._name.textContent = userName;
    this._about.textContent = userAbout;
  }
}