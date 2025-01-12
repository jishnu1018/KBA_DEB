const load=require('lodash')
const sum=require('./addition')
console.log('hello bro')
a="Jishnu"
console.log(`hi, ${a}`);

//if  else
if(a==='Jishnu'){
    console.log("JS is running ok");
    
}else{
    console.log("Not ok");
    
}

//for
for(i=0;i<5;i++){
    b=i+1
    console.log(b);
    
}


//array
let array=[1,2,3,4,5]
console.log(load.reverse(array))

//capitalize
console.log(load.capitalize("hello world"))

//addition
console.log(sum.add(3,4));
