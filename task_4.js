//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

let num = Math.floor(Math.random() * 15)
console.log("Сгенерированное число = ", num);
console.log('\n');
switch (num) {
    case 0:
        console.log(0);
    case 1:
        console.log(1);
    case 2:
        console.log(2);
    case 3:
        console.log(3);
    case 4:
        console.log(4);
    case 5:
        console.log(5);
    case 6:
        console.log(6)
    case 7:
        console.log(7);
    case 8:
        console.log(8);
    case 9:
        console.log(9);
    case 10:
        console.log(10);
    case 11:
        console.log(11);
    case 12:
        console.log(12);
    case 13:
        console.log(13);
    case 14:
        console.log(14)
    case 15:
        console.log(15);
        break;
    default:
        console.log('Что то пошло не так');
        break;
}