/*const presenze=[];
var name1;
var condizione=confirm("vuoi inserire un alunno nuovo?");

while(condizione){
    name1=prompt("Inserisci i dati della persona:")
    condizione=confirm("Ne vuoi inserire un altro?")
    presenze.push([name1,true])
}
console.log(presenze)




let data=[]
data.push(parseInt(prompt("isnerisci giorno valido:")))
data.push(parseInt(prompt("inserisci mese valido:")))
data.push(parseInt(prompt("inserisci anno:")))
//data.push(prompt("inserisci il numero del giorno della settimana: "))

const mesi=["gennaio", "febbraio","marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]

const limiti=[31,28,31,30,31,30,31,31,30,31,30,31]

let nomigiorno= ["domenica","lunedi","martedi","mercoledi","giovedi","venerdi","sabato"]

var limite=1997;
let calendario=[[data[0],data[1],data[2],nomigiorno[data[3]]]] 


function aumentaData2(data){
    //GESTIONE BISESTILE
    console.log(data[0]==limiti[data[1]-1])
    if(data[2]%4==0){
        limiti[1]=29
    }

    //GESTIONE ANNO
    if(data[1]==12 && data[0]==limiti[data[1]-1]){
        return [1,1,data[2]++]
    }
    //GESTIONE LIMITI MESE
    if(data[0]==limiti[data[1]-1]){
        giorno=1
        mese++
        return [1,data[1]++,data[2]]
    }
    return [data[0]++,data[1],data[2]]
}


data=aumentaData2(data)
console.log(data[2]) 
console.log(data)




do {
    data=aumentaData(data[0],data[1],data[2],data[3]);
    
    calendario.push([data[0],data[1],data[2],nomigiorno[data[3]]])
}while(data[2]<=limite)
  console.log(calendario.toString())

function aumentaData(giorno, mese, anno, numerogiorno){
    if((mese==12) && (giorno==31)){
        anno++
        mese=1
        giorno=1
        return [giorno,mese,anno,++numerogiorno%7]
    }
    if ([1,3,5,7,8,10,12].indexOf(mese)>-1 && (giorno==31) || [4,6,9,11].indexOf(mese)>-1 && (giorno==30) || (anno%4)!=0 &&(mese==2)&&(giorno==28) || ((anno%4)==0) && (mese==2)&&(giorno==29)){ 
        mese++
        giorno=1
        return [giorno,mese,anno,++numerogiorno%7]
    } 
    giorno++
    return [giorno,mese,anno,++numerogiorno%7]
}

   */
