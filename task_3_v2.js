

/*
А вот здесь я похоже понял, что имелось ввиду, несколько методов у одного объекта для разного функционала в разных местах

*/



function getProductObject(name, cost) {
    //функция создания объекта товар\продукт
    return {
        name: name,
        cost: cost,
        addToCatalog(Cat){
            Cat[this.name] = this.cost
        },
        moveToBasket(Basket, count){
            Basket.products.push([this.name, this.cost, count])
        }
    }
};

// Объявляем объекты - продукты
let Prod1 = getProductObject('флешка', '500');
let Prod2 = getProductObject('мышка', '250');
let Prod3 = getProductObject('монитор', '1250');

console.log(Prod1);
console.log(Prod2);
console.log(Prod3);


let Catalog = {
    //Объект Каталог
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

//добавляем продукты в каталог
Prod1.addToCatalog(Catalog);
Prod2.addToCatalog(Catalog);
Prod3.addToCatalog(Catalog);

console.log('Объект Каталог: ',Catalog);

//добавляем продукты в корзину
Prod1.moveToBasket(productBasket, 20);
Prod2.moveToBasket(productBasket, 4);
Prod1.moveToBasket(productBasket, 1);
Prod3.moveToBasket(productBasket, 2);

console.log('Объект Корзина: ',productBasket); 

console.log('Сумма в корзине', productBasket.summ());


// вывод
/*
{
  name: 'флешка',
  cost: '500',
  addToCatalog: [Function: addToCatalog],
  moveToBasket: [Function: moveToBasket]
}
{
  name: 'мышка',
  cost: '250',
  addToCatalog: [Function: addToCatalog],
  moveToBasket: [Function: moveToBasket]
}
{
  name: 'монитор',
  cost: '1250',
  addToCatalog: [Function: addToCatalog],
  moveToBasket: [Function: moveToBasket]
}
Объект Каталог:  { 'флешка': '500', 'мышка': '250', 'монитор': '1250' }
Объект Корзина:  {
  products: [
    [ 'флешка', '500', 20 ],
    [ 'мышка', '250', 4 ],
    [ 'флешка', '500', 1 ],
    [ 'монитор', '1250', 2 ]
  ],
  summ: [Function: summ]
}
Сумма в корзине 14000
*/