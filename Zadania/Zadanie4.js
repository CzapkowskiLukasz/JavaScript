class Produkt {
    constructor(id, nazwa, model, rok_produkcji, cena, zuzycieEnergii) {
        this.id = id
        this.nazwa = nazwa
        this.model = model
        this.rok_produkcji = rok_produkcji
        this.cena = cena
        this.zuzycieEnergii = zuzycieEnergii
    }
    koszt() {
        return this.cena
    }
    kosztEnergii() {
        return this.cena * cenaZaKWH
    }
    wiekProduktu() {
        let current_date = new Date()
        let actualYear = current_date.getFullYear()
        return actualYear - this.rok_produkcji
    }
    wiekProduktuLata() {
        let years = this.wiekProduktu()
        if (years == 1)
            return years + " rok"
        else {
            if (((years - 2) % 10 == 0) || ((years - 3) % 10 == 0) || ((years - 4) % 10 == 0))
                return years + " lata"
            else
                return years + " lat"

        }
    }
    zmienWartosci(produkt) {
        this.nazwa = produkt.nazwa
        this.model = produkt.model
        this.rok_produkcji = produkt.rok_produkcji
        this.cena = produkt.cena
        this.zuzycieEnergii = produkt.zuzycieEnergii
    }
}

var cenaZaKWH = 0.96 ///USTAWIANIE CENY

var produkt = new Produkt(47, "ff", "dd", 2001, 69, 4)
console.log(produkt)
console.log(produkt.koszt())
console.log(produkt.kosztEnergii())
console.log(produkt.wiekProduktu())
console.log(produkt.wiekProduktuLata())

class ListaProduktów {
    constructor() {
        this.listaProduktów = []
    }
    wypiszProdukt(id) {
        this.listaProduktów.forEach(element => {
            if (element.id == id) {
                console.log(element)
            }
        });
    }
    wypiszWszystkieProdukty() {
        this.listaProduktów.forEach(element => {
            console.log(element)
        });
    }
    dodajProdukt(produkt) {
        let canAdd = true
        this.listaProduktów.forEach(element => {
            if (element.id == produkt.id) {
                canAdd = false
                throw new Error('Produkt z tym ID juz istnieje');
            }
        });
        if (canAdd)
            this.listaProduktów.push(produkt)
    }
    zmienProdukt(id, produkt) {
        this.listaProduktów.forEach(element => {
            if (element.id == id) {
                element.zmienWartosci(produkt)
            }
        });
    }
}

var listaProduktów = new ListaProduktów()
var produkt2 = new Produkt(34, "hhhh", "daaa", 1997, 69, 6)
listaProduktów.dodajProdukt(produkt)
listaProduktów.wypiszProdukt(47)
listaProduktów.dodajProdukt(produkt2)
listaProduktów.wypiszWszystkieProdukty()
listaProduktów.zmienProdukt(47, produkt2)
listaProduktów.wypiszProdukt(47)


ListaProduktów.prototype.dodajProdukt = function (nazwa, model, rok_produkcji, cena, zużycieEnergii) {
    let produkt = new Produkt(this.id, nazwa, model, rok_produkcji, cena, zużycieEnergii)
    this.listaProduktów.push(produkt)
    this.id++
}

class Sklep extends ListaProduktów {
    constructor() {
        super()
        this.id = 1
    }
    dodajProdukt2(nazwa, model, cena, zużycieEnergii) {
        let produkt = new Produkt(this.id, nazwa, model, cena, zużycieEnergii)
        this.listaProduktów.push(produkt)
        this.id++
    }

    dodajProdukt3(id, nazwa, model, cena, zużycieEnergii) {
        let produkt = new Produkt(id, nazwa, model, cena, zużycieEnergii)
        this.listaProduktów.push(produkt)
    }
}

class Magazyn extends ListaProduktów {
    constructor() {
        super()
    }
    dodajProdukt4(produkt, ilość) {
        let towar = new Object()
        towar.produkt = produkt
        towar.ilosc = ilość
        this.listaProduktów.push(towar)
    }

    zrealizujZamowienie(zamowienie) {
        zamowienie.listaProduktów.forEach(element => {
            this.listaProduktów.forEach(element2 => {
                if (element2.produkt.id == element.id) {
                    element2.ilosc -= 1
                }
            });
        });
    }
}

class Zamówienie extends ListaProduktów {
    constructor() {
        super()
    }
    dodajDoZamówienia(index, magazyn) {
        magazyn.listaProduktów.forEach(element => {
            if (element.produkt.id == index)
                this.listaProduktów.push(element.produkt)
        });
    }
}

let sklep = new Sklep()
sklep.dodajProdukt2("wgrqw", "gqwergetw", 345, 5)
sklep.dodajProdukt3(65, "wttttt", "gqfsdhsfagrew", 34111, 5667)
sklep.wypiszWszystkieProdukty()

let magazyn = new Magazyn()
var produkt3 = new Produkt(82, "ff", "dd", 2001, 69, 4)
magazyn.dodajProdukt4(produkt, 4)
magazyn.dodajProdukt4(produkt3, 7)
magazyn.wypiszWszystkieProdukty()

let zamowienie = new Zamówienie()
zamowienie.dodajDoZamówienia(82, magazyn)

magazyn.zrealizujZamowienie(zamowienie)
magazyn.wypiszWszystkieProdukty()