'use strict';
import { beerList } from "./beers.js";


// !Group beers by brand
function elsoFeladat() {
    let solution = [];
    let beers = [];
    let köztes = {};
    let brands = new Set();

    //sör brandek kiválogatása
    beerList.forEach((sörök) => {
        brands.add(sörök.brand)
    });
    brands = Array.from(brands);

    for (let index = 0; index < brands.length; index++) {
        beers = [];
        // sörnevek (ismétlés nélküli) kiválogatása brand szerint
        beerList.forEach((item) => {
            if (brands[index] == item.brand) {
                beers.push(item)
                // if (!beers.includes(item.name)) {                   
                // }
            }
        });

        //hozzáadás a megoldás array-hez
        köztes = {
            'brand': brands[index],
            'beers': beers
        };
        solution.push(köztes);
    }
    return solution;
};

// !Filter brands by BeerType
function masodikFeladat(beerType) {
    let megoldas = [];
    beerList.forEach((item) => {
        if (item.type == beerType) {
            megoldas.push(item);
        }
    });
    if (megoldas.length == 0) {
        alert('Kérlek adj meg egy valós típust "" jelek között!');
        return false;
    }
    return megoldas;
};

// Get the cheapest brand
function harmadikFeladat() {
    let megoldas = [];
    let a = elsoFeladat();
    let legolcsobbÁtlagÁr;
    let sörÁtlagÁrak = [];
    let átlagÁr;
    a.forEach((item) => {
        átlagÁr = 0;
        for (let index = 0; index < item.beers.length; index++) {
            átlagÁr = átlagÁr + parseFloat(item.beers[index].price);
        };
        átlagÁr = átlagÁr / item.beers.length;
        sörÁtlagÁrak.push(átlagÁr);
        item['átlagár'] = átlagÁr;
    });

    //legolcsobb sörÁtlagár megkeresése
    legolcsobbÁtlagÁr = Math.min.apply(null, sörÁtlagÁrak);

    //azzal az esettel is számoltam, ha két "legolcsóbb" brand is lenne
    a.forEach((item) => {
        if (legolcsobbÁtlagÁr == item['átlagár']) {
            megoldas.push(item)
        }
    });

    //Legolcsóbb brand nevek kigyűjtése
    const megoldasNévVagyNevek = [];
    megoldas.forEach((item) => {
        megoldasNévVagyNevek.push(item.brand)
    });
    return megoldasNévVagyNevek;
};

// Which beers contain a specific ingredient
function VasilyGrigoryevichZaytsev(ingredientInput) {
    let actualRatio;
    let megoldas = [];
    if (ingredientInput == "cukor" || ingredientInput == "só" || ingredientInput == "árpa") {
        for (let i = 0; i < beerList.length; i++) {

            for (let y = 0; y < beerList[i].ingredients.length; y++) {
                actualRatio = parseFloat(beerList[i].ingredients[y].ratio);
                if (actualRatio == 0 && ingredientInput == beerList[i].ingredients[y].name) {
                    megoldas.push(beerList[i])
                }
            }
        }
    } else {
        alert('Kérlek válassz a következő lehetőségek közül : "cukor" , "árpa", "só" ! A paramétert pontosan add meg ("" között), érdemes innen kimásolnod.');

        return false;
    }

    return megoldas;
};

// List all beers with Water ingredient ratio (remaining ratio) - sort by ratio
function otodikFeladat() {

    let sumOfRatio = 0;

    for (let index = 0; index < beerList.length; index++) {
        for (let y = 0; y < beerList[index].ingredients.length; y++) {
            let currentRatio = beerList[index].ingredients[y].ratio;
            sumOfRatio = sumOfRatio + parseFloat(currentRatio);

        };
        sumOfRatio = 1 - sumOfRatio;
        beerList[index]['sumOfRatio'] = sumOfRatio;
        sumOfRatio = 0;

    }
    //az eredeti sorrend megtartása
    let megoldas = JSON.parse(JSON.stringify(beerList));
    megoldas.sort(function (a, b) {
        return b.sumOfRatio - a.sumOfRatio;
    });
    return megoldas;
};

// Bonus - Hashmap based on properties
function hatodikFeladat() {
    let megoldas = new Map();
    //uniquePrices
    let prices = [];
    beerList.forEach((item) => {
        if (!prices.includes(item.price)) {
            prices.push(item.price)
        }
    });
    //sorba rendezés
    prices.sort((a, b) => {
        return b - a;
    });

    let currentHoundred = 0;
    let köztes = 0;
    let justDoIt = prices.length;
    let beszédesNév = [];
    do {
        beszédesNév = [];
        currentHoundred = Math.ceil(prices[justDoIt] / 100) * 100;
        beerList.forEach(element => {
            if (element.price == prices[justDoIt]) {
                beszédesNév.push(element)
            }
        });
        if (currentHoundred) {
            if (megoldas.has(currentHoundred)) {
                //nem kell uj ertek
                köztes = megoldas.get(currentHoundred).push(beszédesNév)
            }
            else {
                megoldas.set(currentHoundred, beszédesNév)
            }
        }
        justDoIt = justDoIt - 1;
    } while (justDoIt);
    return megoldas;
};


