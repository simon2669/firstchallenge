'use strict';
import {beerList} from "./beers.js";
// beerList.forEach(element => {
//     console.log(element)
// });
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

