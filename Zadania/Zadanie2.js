//ZADANIE 1
console.log("Zadanie 1: \n")
let i
let text = "1 "
for (i = 2; i < 101; i++) {
    let x = i % 2
    switch (x) {
        case 0:
            if (i % 3 == 0)
                text += "FizBuz "
            else
                text += "Fiz "
            break
        case 1:
            if (i % 3 == 0) {
                text += "Buz "
            }
            else
                text += i + " "
    }
}
console.log(text)

//ZADANIE 2
console.log("\n Zadanie 2: \n")
const prompt = require("prompt-sync")()
let radius = prompt("Enter circle radius: ")
let area = Math.round(Math.PI * radius * radius * 100) / 100
let circuit = Math.round(2 * Math.PI * radius * 100) / 100
let text2 = "Area is equal " + area + ". Circuit is equal " + circuit
console.log(text2)

//ZADANIE 3
console.log("\n Zadanie 3: \n")
function createArray() {
    let x = 0
    let table = []
    while (x < 200) {
        let newNumber = Math.floor(Math.random() * 10) + 1;
        x += newNumber
        table.push(newNumber)
    }
    return table
}

let mainTable = createArray() //a
console.log("a) Created array:")
console.log(mainTable)

function removeFirstMinimal() {
    let min = Math.min(...mainTable)
    mainTable.splice(mainTable.indexOf(min), 1)
}

removeFirstMinimal() //b
console.log("\nb) Array after removing first minimal number:")
console.log(mainTable)

function removeLastMaximal() {
    let max = Math.max(...mainTable)
    mainTable.splice(mainTable.lastIndexOf(max), 1)
}


removeLastMaximal() //c
console.log("\nc) Array after removing last maximal number:")
console.log(mainTable)

function counter() {
    let table = new Array(10)
    table.fill(0)
    for (i = 0; i < mainTable.length; i++) {
        table[mainTable[i] - 1] += 1
    }
    console.log("number: how many times:")
    for (i = 0; i < table.length; i++) {
        console.log(i + 1 + " " + table[i])
    }
}

console.log("\nd) Counter:")
counter() //d

function cut() {
    let cutOf = mainTable.splice(0, 10)
    return mainTable.concat(cutOf)
}

mainTable = cut() //e
console.log("\ne) Array after transformation:")
console.log(mainTable)


//ZADANIE 4
console.log("\n Zadanie 4: \n")
let nameArray = ["Kazimierz", "Paweł", "Eugeniusz", "Aleksandra", "Anna"]

function changeLetters(name) {
    name = name.replace(/a/g, "4")
    name = name.replace(/A/g, "4")
    name = name.replace(/e/g, "3")
    name = name.replace(/E/g, "3")
    return name
}
function codeNames() {
    for (i = 0; i < nameArray.length; i++) {
        nameArray[i] = changeLetters(nameArray[i])
        if (nameArray[i].length > 6) {
            let nameToTransform = nameArray[i]
            let newName
            let nameFirstHalf = nameToTransform.slice(0, 3)
            let nameLastHalf = nameToTransform.slice(nameToTransform.length - 4, nameToTransform.length - 1)
            newName = nameFirstHalf + "..." + nameLastHalf
            nameArray[i] = newName
        }
    }
}
console.log(nameArray)
codeNames()
console.log(nameArray)


//ZADANIE 5
console.log("\n Zadanie 5: \n")
let products = "jajka, mleko, masło, chleb, ser, parówki, woda"
let productsList = products.split(", ")
function makeObjects() {
    let objectArray = []
    for (i = 0; i < productsList.length; i++) {
        let obj = new Object()
        obj.name = productsList[i]
        obj.price = Math.round(Math.random() * 10000) / 100
        objectArray.push(obj)
    }
    return objectArray
}

let objectArray = makeObjects()
console.log("Products in shop:")
console.table(objectArray)

let productCount = Math.round(Math.random() * (objectArray.length / 2))
if (productCount == 0)
    productCount = 1
console.log("How many products chosen: " + productCount)
function makeShopingList() {
    let indexArray = []
    while (indexArray.length < productCount) {
        let index = Math.round(Math.random() * (objectArray.length - 1) + 1)
        if (index < objectArray.length - 1) {
            if (!indexArray.includes(index)) {
                indexArray.push(index)
            }
        }
    }
    let finalArray = []
    for (i = 0; i < productCount; i++) {
        let obj = new Object()
        obj.product = objectArray[indexArray[i]]
        obj.count = Math.round(Math.random() * 10) + 1
        finalArray.push(obj)
    }
    return finalArray
}
let finalArray = makeShopingList()
console.table(finalArray)
function sumUpShopingList() {
    let sum = 0
    for (i = 0; i < productCount; i++) {
        sum += finalArray[i].product.price * finalArray[i].count
    }
    console.log("Purchase amount is: " + Math.round(sum * 100) / 100)
}

sumUpShopingList()