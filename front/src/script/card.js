export default class Card {

    constructor(api) {
        this.api = api;
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            //Если лайка нет, тогда ставим его
            if (!event.target.classList.contains('place-card__like-icon_liked')) {
                this.api.setLike(event.target.closest('.place-card').id)
                    .then(data => {
                        event.target.closest('.place-card')
                            .querySelector('.place-card__like-count')
                            .textContent = data.likes.length;
                    });
            }else {
                //Если лайк есть, тогда снимаем его
                this.api.deleteLike(event.target.closest('.place-card').id)
                    .then(data => {
                        event.target.closest('.place-card')
                            .querySelector('.place-card__like-count')
                            .textContent = data.likes.length;
                    });
            }
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }

    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
                this.api.deleteCard(event.target.closest('.place-card').id)
                    // По идее, я могу вызвать метод render, тогда при удалении перезагрузятся заново
                    // все картинки, но мне кажется, это лишняя нагрузка на сервер и лишний трафик. По этому просто удаляю из верстки,
                    // ну и не забываю про ответ сервера.
                    .then(() => event.target.closest('.place-card').remove());
            }
        }
    }

    //Скрывает иконку delete у чужих картинок
    setDeleteIcon (item){
        const OWNER_ID = 'fbcd363148175db7badc686b';
        return item.owner._id !== OWNER_ID ? 'place-card__delete-icon_hidden' : '';
        }

    //Если поставил лайк, его нужно отображать при обновлении страницы
    setLikeIcon (item){
        const OWNER_ID = 'fbcd363148175db7badc686b';
        let result = item.likes.find(elem => elem._id === OWNER_ID);

        return result === undefined ? '' : 'place-card__like-icon_liked';
    }

    create(element){

        let toHidden = this.setDeleteIcon(element);
        let isLiked = this.setLikeIcon(element);

        const template = `<div class="place-card" id="${element._id}"> 
                                   <div class="place-card__image" style="background-image: url(${element.link})"> 
                                       <button class="place-card__delete-icon ${toHidden}"></button>
                                   </div>
                                   <div class="place-card__description">
                                       <h3 class="place-card__name">${element.name}</h3>
                                       <div class="place-card__like">
                                        <button class="place-card__like-icon ${isLiked}"></button>
                                        <p class="place-card__like-count">${element.likes.length}</p>
                                       </div>
                                   </div>
                               </div>`;
        return template;
    }
}
