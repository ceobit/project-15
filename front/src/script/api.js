export default class Api {

    constructor(options) {
        this.options = options;
    }

    getResponse(page) {
       return fetch(this.options.baseUrl+page, {
                headers: this.options.headers
            }
        )
            .then(res => {
                if (res.ok) {
                     return res.json();
                }
                return Promise.reject(`Проблемка ${res.status}`);
            })
            .then(result => {
                return result;
            })
           .catch(err =>{
               console.log(`Возникла ошибка: ${err}`);
           });
    }

    setUserInfo(userInfoData) {
        return fetch(this.options.baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: userInfoData.name.value,
                about: userInfoData.job.value
            })
        })
        .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Проблемка ${res.status}`);
                })
                .catch(err => {
                    console.log(`Возникла ошибка ${err}`);
                });
    }

    sendNewCard(cardData) {
        return fetch(this.options.baseUrl + 'cards', {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: cardData.name.value,
                link: cardData.link.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Проблемка ${res.status}`);
            })
            .catch(err => {
                console.log(`Возникла ошибка ${err}`);
            });
    }

    deleteCard(cardId) {
        return fetch(this.options.baseUrl + 'cards/' +cardId, {
            method: 'DELETE',
            headers: this.options.headers,
        })
            .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Проблемка ${res.status}`);
        })
            .catch(err => {
                console.log(`Возникла ошибка ${err}`);
            });
    }

    setLike(cardId) {
        return fetch(this.options.baseUrl + 'cards/like/' +cardId, {
            method: 'PUT',
            headers: this.options.headers,
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Проблемка ${res.status}`);
            })
            .then(result => {
                return result;
            })
            .catch(err =>{
                console.log(`Возникла ошибка ${err}`);
            });
    }

    deleteLike(cardId) {
        return fetch(this.options.baseUrl + 'cards/like/' +cardId, {
                method: 'DELETE',
                headers: this.options.headers,
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Проблемка ${res.status}`);
            })
            .then(result => {
                return result;
            })
            .catch(err =>{
                console.log(`Возникла ошибка ${err}`);
            });
    }

    changeAvatar(data){
        return fetch(this.options.baseUrl+'users/me/avatar', {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: data.link.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Проблемка ${res.status}`);
            })
            .catch(err => {
                console.log(`Возникла ошибка ${err}`);
            });
    }
}


