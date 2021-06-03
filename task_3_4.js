/*
3. Объявить две переменные: admin и name. Записать в name строку "Василий"; Скопировать значение из name в admin. Вывести admin (должно вывести «Василий»).
*/

let name = 'Василий'
var admin = null


console.log('тип name:',typeof name)
console.log('тип admin:',typeof admin)

admin = name

console.log('\nновое значение admin:',admin)
console.log('\nтип admin:',typeof admin)

/* Вывод:
D:\Program Files\nodejs\node.exe .\task_3.js
тип name: string
тип admin: object

новое значение admin: Василий

тип admin: string
*/


/*
4. *Чему будет равно JS-выражение 1000 + "108"/
*/

let summ = 1000 + "108"
console.log('\nсумма:',summ)

// Вывод: сумма: 1000108
//происходит конкатенация
