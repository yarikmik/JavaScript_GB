/*
3.* Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине актуальна не только для корзины, но и для каталога. 
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в разных местах давал возможность вызывать разные методы.
*/


function getProductObject(name, cost) {
    //функция создания объекта товар\продукт
    return {
        name: name,
        cost: cost
    }
};

let Prod1 = getProductObject('флешка', '500');
let Prod2 = getProductObject('мышка', '250');
let Prod3 = getProductObject('монитор', '1250');

console.log(Prod1, Prod2, Prod3);

productList = [Prod1, Prod2, Prod3];

function addToCatalog(productList){
    return{
        prducts: productList
    }
};

let catalog = addToCatalog(productList);

console.log('sfdgsfd ',catalog.prducts);

