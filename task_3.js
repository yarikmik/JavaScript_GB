

/*
 Добрый день, возможно не понял задания, для меня не совсем ясна формулировка:
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в разных местах давал возможность вызывать разные методы.

"возможность вызывать разные методы" в разных местах, но при этом у Продукта единая структура для различных модулей -- как то не могу осмыслить, 
т.е у Продукта несколько методов? Или Продукт как объект - однотипный, но по разному используется в разных модулях?
Вот последнее и попытался реализовать, как это себе я представляю.


up: сделал еще один вариант в файле task_3_v2.js
*/



function getProductObject(name, cost) {
    //функция создания объекта товар\продукт
    return {
        name: name,
        cost: cost
    }
};

// Объявляем объекты - продукты
let Prod1 = getProductObject('флешка', '500');
let Prod2 = getProductObject('мышка', '250');
let Prod3 = getProductObject('монитор', '1250');



let Catalog = {
    // метод добавления продуктов в объект Каталог:
    addToCatalog(Obj){
        //в этом моменте не понял как можно реализовать некий id для объекта (счетчик уже имеющихся id), 
        //поэтому использую его собственное название:
        this[Obj.name] = Obj
    },
    // метод переносит товар в объект корзины
    moveToBasket(Basket, ProdName, count){
        for(const prod in this){
            if (prod == ProdName)
            Basket.products.push([this[prod].name, this[prod].cost, count])
        }
    }
}

let productBasket = {
    //Объект корзина
    products: [],
    summ() {
        //подсчет суммы к ворзине
        let summ = 0
        for(const value of this.products){
            summ += value[1]*value[2]
        }
    return summ
    }
}

// добавляем в каталог продукты
Catalog.addToCatalog(Prod1)
Catalog.addToCatalog(Prod2)
Catalog.addToCatalog(Prod3)

console.log('Объект Каталог: ',Catalog);

// заносим из каталога продукты в корзину
Catalog.moveToBasket(productBasket, 'флешка', 20)
Catalog.moveToBasket(productBasket, 'мышка', 5)
Catalog.moveToBasket(productBasket, 'мышка', 1)


console.log('Объект Корзина: ',productBasket); //{ products: [ [ 'флешка', '500', 20 ] ], summ: [Function: summ] }

console.log('Сумма в корзине', productBasket.summ());


// получилось что то такое, очень жду комментариев и\или подробного разбора на след уроке
/*
Объект Каталог:  {
  addToCatalog: [Function: addToCatalog],
  moveToBasket: [Function: moveToBasket],
  'флешка': { name: 'флешка', cost: '500' },
  'мышка': { name: 'мышка', cost: '250' },
  'монитор': { name: 'монитор', cost: '1250' }
}
Объект Корзина:  {
  products: [
    [ 'флешка', '500', 20 ],
    [ 'мышка', '250', 5 ],
    [ 'мышка', '250', 1 ]
  ],
  summ: [Function: summ]
}
Сумма в корзине 11500
*/