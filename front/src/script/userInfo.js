export default class UserInfo {
  constructor(api) {
    this.api = api;
  }

  setUserInfo() {
    const popupForm = document.forms.profil;
    this.api.setUserInfo(popupForm.elements).then(() => {
      this.getUserInfo();
      document.querySelector('.popup__button').textContent = 'Loading...';
    });
  }

  getUserInfo() {
    this.api.getResponse('users/me').then(data => {
      this.updateUserInfo(data);
    });
  }

  updateUserInfo(data) {
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const userInfoPhoto = document.querySelector('.user-info__photo');

    userInfoName.textContent = data.name;
    userInfoJob.textContent = data.about;
    userInfoPhoto.style.backgroundImage = `url(${data.avatar})`;
    document.querySelector('.root__auth').textContent = data.name;
  }

  changeUserAvatar() {
    const popupForm = document.forms.avatar;
    this.api.changeAvatar(popupForm.elements).then(() => {
      this.getUserInfo();
      document.querySelector('.popup__button').textContent = 'Loading...';
    });
  }

  login() {
    const popupForm = document.forms.auth;
    this.api.login(popupForm.elements).then(() => {
      console.log(data);
      this.getUserInfo();
    });
  }

}

