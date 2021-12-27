
let array1 = [1, 2, 3]
let array2 = [10, 20, 30]
let array3 = [4, 5, 6]

function add(x, y) {
    return x + y
}

function Zadanie1a(x, y, fun) {
    var result = [];
    for (i = 0; i < x.length; i++) {
        result.push(fun(x[i], y[i]))
    }
    return result;
}

console.log(Zadanie1a(array1, array2, add)) //ZADANIE 1A

function Zadanie1b(x, y) {
    let point = new Object()
    point.x = x
    point.y = y
    return point
}

console.log(Zadanie1a(array1, array2, Zadanie1b)) //ZADANIE 1B

function zadanie1c(fun, ...rest) {
    let count = rest.length
    let result = []
    result.fill(0)
    let pom = 0
    for (i = 0; i < rest[0].length; i++) {
        for (j = 0; j < count; j++) {
            pom = fun(pom, rest[j][i])
        }
        result.push(pom)
        pom = 0
    }
    console.log(result)
}

zadanie1c(add, array1, array2, array3) //ZADANIE 1C

function Zadanie2(x, y) {
    let start = x
    let koniec = y
    let wsk = x
    let rosnace = true
    let stan = true
    if (start > koniec) rosnace = false
    return function () {
        if (stan) {
            if (rosnace) {
                if (wsk <= koniec) {
                    return wsk++
                }
            }
            if (!rosnace) {
                if (wsk >= koniec) {
                    return wsk--
                }
            }
            stan = false
        }
        return NaN
    }
}

const prompt = require("prompt-sync")()
let x = prompt("Enter first number: ")
let y = prompt("Enter second number: ")

let test = Zadanie2(x, y) //ZADANIE 2
console.log(test())
console.log(test())
console.log(test())

let napis = prompt("Enter string: ")

function Zadanie3(text) {
    let textArray = text.split('')
    return textArray.reduce((slownik, element) => {
        slownik[element] = (slownik[element] ?? 0) + 1
        return slownik
    }, {})
}


console.log(Zadanie3(napis)) //ZADANIE 3


let array4 = [4, 7, 6, 9, 4, 2, 0, 9, 9, 7, 2, 1, 3, 7]
console.log("Array before changes: ")
console.log(array4)



function zadanie4(tablica) {
    let pom = []
    let x = 0
    tablica.forEach(element => {
        if (x % 2 == 1) { pom.push(tablica[x]) }
        x++
    });
    let min = Math.min(...pom)
    let max = Math.max(...pom)
    pom[pom.indexOf(min)] = 0
    let final = pom.map(val => val / max)
    console.log(final.map(val => val.toFixed(2)).join(", "))
}



console.log("Array after changes: ")
zadanie4(array4) //ZADANIE 4

let dlugoscTablicy = prompt("Enter array length: ")

function zadanie5(dlugoscTablicy) {
    console.log("Generated array:")
    let generatedArray = createArray(dlugoscTablicy)
    console.log(generatedArray)
    console.log("Liczba parzystych: " + liczParzyste(generatedArray))
    console.log("Iloczyn: " + liczIloczyn(generatedArray))
}

function createArray(arrayLength) {
    let array5 = []
    for (i = 0; i < arrayLength; i++) {
        array5.push(Math.floor(Math.random() * 10) + 1)
    }
    return array5
}

function liczParzyste(tablica) {
    return tablica.reduce((licz, val) =>
        val % 2 == 0 ? licz + 1 : licz, 0)
}


function iloczyn(last, curr) {
    return last * curr
}

function liczIloczyn(tablica) {
    return tablica.reduce(iloczyn)
}

zadanie5(dlugoscTablicy) //ZADANIE 5
