//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

let num = Math.floor(Math.random() * 15)
console.log("Сгенерированное число = ", num);
console.log('\n');
switch (num) {
    case 0:
        console.log(num++);
    case 1:
        console.log(num++);
    case 2:
        console.log(num++);
    case 3:
        console.log(num++);
    case 4:
        console.log(num++);
    case 5:
        console.log(num++);
    case 6:
        console.log(num++)
    case 7:
        console.log(num++);
    case 8:
        console.log(num++);
    case 9:
        console.log(num++);
    case 10:
        console.log(num++);
    case 11:
        console.log(num++);
    case 12:
        console.log(num++);
    case 13:
        console.log(num++);
    case 14:
        console.log(num++)
    case 15:
        console.log(num);
        break;
    default:
        console.log('Что то пошло не так');
        break;
}