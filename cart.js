/*
1. Доработать модуль корзины.
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
*/

const catalogItem = { //блок каталога
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>ID</b>: <b class = "id">${good.id_product}</b></div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <button class="buy-btn">Купить</button>
                </div>`;
    }
};

const cartItem = { // блок корзины
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
                </div>`;
    }
};

const catalog = {
    catalogListBlock: null,
    catalogItem,
    itemBuyButton: null,
    goods: [
        {
            id_product: 123,
            product_name: 'Ноутбук',
            price: 45600,
        },
        {
            id_product: 568,
            product_name: 'Монитор',
            price: 15600,
        },
        {
            id_product: 456,
            product_name: 'Мышка',
            price: 1000,
        },
        {
            id_product: 305,
            product_name: 'Клавиатура',
            price: 2000,
        },
    ],
    
    init(){
        this.catalogListBlock = document.querySelector('.catalog');
        this.catalogRender();

        // навешиваем на все кнопки обработчик по клику
        [...document.querySelectorAll('.buy-btn')].forEach(elem => elem.addEventListener('click', (event) =>{
            this.addToCart(event);
        }));

    },

    addToCart(event){
        //дергаем id из родительского блока, где зафиксировано нажатие кнопки "купить"
        let id = +event.target.parentNode.querySelector(".id").textContent
        // console.log(id);

        // ищем необходимы продукт по id
        let product = {};
        for (const value of this.goods){
            if (value.id_product === id){
                //создаем новый объект, добавляем quantity и пихаем в корзину
                
                Object.assign(product, value, {quantity:1});
            };
        };
        // console.log(product);

        //в этом месте запускается логика корзины
        cart.init(product);

    },

    catalogRender(){
            this.goods.forEach(good => {
                this.catalogListBlock.insertAdjacentHTML('beforeend', this.catalogItem.render(good));
            });
    },




};

const cart = {
    cartListBlock: null,
    cartButton: null,
    cartItem,
    goods: [],


    init(product) {
        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));

        // проверяем есть ли уже такой продукт в корзине, если есть, то прибавляем колличество
        
        if (this.checkProductInCatalog(product)){
            this.changeQuantity(product);
        }else{
            //иначе добавляем весь новый объект
            this.goods.push(product);
        };

        // console.log(this.checkProductInCatalog(product));

        this.render();
    },

    checkProductInCatalog(product) {
        return this.goods.find(good => good.id_product === product.id_product)
    },

    changeQuantity(product){
        for (const value of this.goods){
            if (value.id_product === product.id_product){
                value.quantity++;
            }
        }
    },


    render() {
        this.cartListBlock.textContent = '';
        if (this.goods.length) {
            this.goods.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.goods.length} позиций(я) стоимостью ${this.getCartPrice()}`);
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }
    },

    getCartPrice() {
        return this.goods.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },

    clearCart() {
        this.goods = [];
        this.render();
    },
};

catalog.init();

