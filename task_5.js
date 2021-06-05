//5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

function fnSumm(a, b){
    return a+b
}

function fnDiff(a, b){
    return a-b
}

function fnMulti(a, b){
    return a*b
}

function fnDiv(a, b){
    return a/b
}

let a = Math.floor(Math.random() * 100)
let b = Math.floor(Math.random() * 100)

console.log(`Сумма ${a} и ${b} = `, fnSumm(a,b));
console.log(`Разность ${a} и ${b} = `, fnDiff(a,b));
console.log(`Умножение ${a} и ${b} = `, fnMulti(a,b));
console.log(`Деление ${a} на ${b} = `, fnDiv(a,b));