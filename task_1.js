/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

let a = 2

while (a <=100){
    let b = 2
    let count = 0
    while (b < a){
        
        if (a % b == 0) {
            count++
        }
        b++
    }
    if (count == 0){
        console.log(a);
    }
    a++
}