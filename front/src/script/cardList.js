export default class CardList{
    constructor(container, api, card) {
        this.container = container;
        this.api = api;
        this.card = card;
    }

    addCard(item){
        const cardItem = this.card.create(item);
        this.container.insertAdjacentHTML('beforeend', cardItem);
        //Установим видимость иконки Delete только у owner
    }

    render(){
        this.api.getResponse('cards')
            .then(initialCards => {
                for (const item of initialCards) {
                    this.addCard(item);
                }
            });
    }
}
