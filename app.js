'use strict';

import {beerList} from "./beers.js";

function elsoFeladat(){

    let solution=[];
    let beers=[];
    let köztes = {};

    let brands = new Set();


    //sör brandek kiválogatása
    beerList.forEach((sörök)=>{
        brands.add(sörök.brand)
    })
    brands=Array.from(brands);


    for (let index = 0; index <brands.length; index++) {
        beers=[];
        // sörnevek (ismétlés nélküli) kiválogatása brand szerint
        beerList.forEach((item)=>{
            if (brands[index]==item.brand) {
                beers.push(item)
                // if (!beers.includes(item.name)) {                   
                // }
            }
        })
        //hozzáadás a megoldás array-hez
        köztes={
            'brand': brands[index],
            'beers': beers
        };
        solution.push(köztes);
        //console.log(beers) 
    }  
    //console.log(solution)
    return solution;
};
(function masodikFeladat(beerType='Szűrt'){
    let megoldas = [];
    beerList.forEach((item)=>{
        if (item.type==beerType) {
            megoldas.push(item);
        }
    })
    //console.log(megoldas)
    return megoldas;
})();


(function harmadikFeladat(){
    let megoldas=[];
    let a =elsoFeladat();
    let legolcsobbÁtlagÁr;
    let sörÁtlagÁrak=[];
    a.forEach((item)=>{
        let átlagÁr=0;
        for (let index = 0; index < item.beers.length; index++) {
            átlagÁr = átlagÁr+parseInt(item.beers[index].price);         
        }
        átlagÁr= átlagÁr/item.beers.length;
        sörÁtlagÁrak.push(átlagÁr);
        item['átlagár']=átlagÁr;
    })
    console.log(sörÁtlagÁrak)
    //legolcsobb sörÁtlagár megkeresése
    legolcsobbÁtlagÁr=Math.min.apply(null, sörÁtlagÁrak);
    
    //azzal az esettel is számoltam, ha két "legolcsóbb" brand is lenne
    a.forEach((item)=>{
        if (legolcsobbÁtlagÁr==item['átlagár']) {
            megoldas.push(item)
        }
    })
    
    //Legolcsóbb brand nevek kigyűjtése
    const megoldasNévVagyNevek=[];
    megoldas.forEach((item)=>{
        megoldasNévVagyNevek.push(item.brand)
    });

    return megoldasNévVagyNevek;
})();


(function otodikFeladat(){
    let a =elsoFeladat();
    let sumOfRatio=0;

    for (let index = 0; index < beerList.length; index++) {
        for (let y = 0; y < beerList[index].ingredients.length; y++) {
            let currentRatio= beerList[index].ingredients[y].ratio;
            sumOfRatio=sumOfRatio+parseFloat(currentRatio);
            
        }
        sumOfRatio= 1-sumOfRatio;
        beerList[index]['sumOfRatio']=sumOfRatio;
        //console.log(sumOfRatio)
        sumOfRatio=0;
        
    }
    //az eredeti sorrend megtartása
    let megoldas = JSON.parse(JSON.stringify(beerList));
    megoldas.sort(function(a, b) {
        return b.sumOfRatio - a.sumOfRatio;
      });
    //console.log(megoldas)

    return megoldas;
})();


(function hatodikFeladat(){
    let megoldas = new Map();
    
    //uniquePrices
    let prices = [];
    beerList.forEach((item)=>{
         if (!prices.includes(item.price)) {
             prices.push(item.price)
         }
    });
    //sorba rendezés
    prices.sort((a,b)=>{
        return b-a;
    });

    let currentHoundred=0;
    let köztes = 0;
    let justDoIt=prices.length;
    let vlmi=[];
    do {
        vlmi=[];
        currentHoundred= Math.ceil(prices[justDoIt] / 100) * 100;
        beerList.forEach(element => {
            if (element.price==prices[justDoIt]) {
                vlmi.push(element)
            }
        });
        if (currentHoundred) {
            if (megoldas.has(currentHoundred)) {
                //nem kell uj ertek
                
                köztes = megoldas.get(currentHoundred).push(vlmi)
            }
            else{
                megoldas.set(currentHoundred,vlmi)
    
    
            }
        }
        justDoIt=justDoIt-1;
    } while (justDoIt);   
      console.log(megoldas)

})();


