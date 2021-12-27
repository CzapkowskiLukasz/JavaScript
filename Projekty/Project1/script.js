class Product {
    constructor(_id, _name, _price, _count) {
        this.id = _id
        this.name = _name
        this.price = _price
        this.count = _count
    }
    toString() {
        return this.name + this.price + this.count
    }
}

document.forms.addProduct.onsubmit = function (event) {
    readFromLocalStorage()
    var name = event.target.addName.value
    var price = round(event.target.addPrice.value)
    var count = event.target.addCount.value
    productArray.push(new Product(productArray.length + 1, name, price, count))
    saveChanges(event)
}

function round(value) {
    return (Math.round(value * 100) / 100).toFixed(decimalPlace);
}

function createTittle() {
    var tittle = document.getElementById("tittle")
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    tittle.innerHTML = 'Receipt ' + date + ' ' + time;
}

function openLocalStorage() {
    return window.localStorage
}

function savetoLocalStorage() {
    var ls = openLocalStorage()
    var outpuArray = {};

    for (var i = 0; i < productArray.length; i++) {
        var id = i;
        outpuArray[id] = {
            name: productArray[i].name,
            price: productArray[i].price,
            cout: productArray[i].count,
        };
    }

    ls.setItem('test20', JSON.stringify(productArray))
    clearArray()
}

function readFromLocalStorage() {
    clearArray()
    var ls = openLocalStorage()
    var pom = JSON.parse(ls.getItem('test20'));
    if (pom) {
        pom.forEach(element => {
            productArray.push(new Product(element.id, element.name, element.price, element.count))
        });
    }

}

function clearArray() {
    productArray = []
}

function createTd(text) {
    var td = document.createElement('td')
    td.innerHTML = text
    return td
}

function createTr(lp, name, price, count, sum) {
    var tr = document.createElement('tr')
    var index = lp.innerHTML
    colorBackground(tr, index)
    tr.className = 'element'
    tr.id = index
    tr.onclick = function (event) {
        readFromLocalStorage()
        actualClicked = parseInt(event.currentTarget.id, 10)
        var oldProduct = productArray[actualClicked - 1]
        onElementClick(oldProduct)
        var deleteElement = document.getElementById('delete')
        deleteElement.onclick = function(){
            productArray.splice(actualClicked-1,1)
            refreshTable()
            createElement()
            savetoLocalStorage()
            abortPopup()
        }
        document.forms.editProduct.onsubmit = function (event) {
            var name = event.target.editName.value
            var price = round(event.target.editPrice.value)
            var count = event.target.editCount.value
            productArray[actualClicked - 1] = new Product(actualClicked, name, price, count)
            saveChanges(event)
            abortPopup()
        }
    }
    tr.appendChild(lp)
    tr.appendChild(name)
    tr.appendChild(price)
    tr.appendChild(count)
    tr.appendChild(sum)
    return tr
}

function refreshTable(){
    var pomArray = productArray
    productArray = []
    for (var i=0; i<pomArray.length; i++){
        productArray.push(new Product(i +1 , pomArray[i].name, pomArray[i].price, pomArray[i].count))
    }
}

function saveChanges(event) {
    createElement()
    event.preventDefault()
    savetoLocalStorage()
}

function colorBackground(tr, index) {
    if (index % 2 == 0)
        tr.style.backgroundColor = 'lightgray'
    else
        tr.style.backgroundColor = 'whitesmoke'
}

function createElement() {
    clearTableRows()
    var list = document.getElementById('list')
    productArray.forEach(element => {
        var priceForProduct =  parseFloat(round( element.price * element.count),10)
        suma += priceForProduct
        var lpTd = createTd(element.id)
        var nameTd = createTd(element.name)
        var priceTd = createTd(element.price)
        var countTd = createTd(element.count)
        var sumaTd = createTd(priceForProduct)
        var tr = createTr(lpTd, nameTd, priceTd, countTd, sumaTd)
        list.appendChild(tr)
    });
    createSumaAll()
}

function createSumaAll() {
    var summary = document.getElementById('enterSummary')
    summary.innerHTML = round(suma)
    suma = 0
}

function clearTableRows() {
    var ar = document.getElementsByClassName("element");
    if (ar.length > 0) {
        var pom = ar.length - 1
            for (var i = pom; i >= 0; i--)
                ar[i].remove()
    }
}

function onElementClick(oldProduct) {
    var popup = document.getElementById('popup')
    popup.style.visibility = 'visible'
    var editName = document.getElementById('editName')
    editName.value = oldProduct.name
    var editPrice = document.getElementById('editPrice')
    editPrice.value = oldProduct.price
    var editCount = document.getElementById('editCount')
    editCount.value = oldProduct.count
}

function abortPopup() {
    var popup = document.getElementById('popup')
    popup.style.visibility = 'hidden'
}

function onLoad() {
    abortPopup()
    createTittle()
    readFromLocalStorage()
    createElement()
}

const decimalPlace = 2
var actualClicked = 0
var suma = 0
var productArray = []

