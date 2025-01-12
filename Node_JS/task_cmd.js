const tasks=[];
const args=process.argv.slice(2)
const Command=args[0];
const task=args[1];
if(Command==='add'){
    //if(task){
        tasks.push(task)
        console.log('Task added',task)
        console.log(tasks)
    //}
}
else{
    console.log("Invalid");
    
}

//sum of 2 numbers
const sums=process.argv.slice(2)
a=parseInt(sums[0])
b=parseInt(sums[1])
s=a+b
// sum.push(third)
console.log(s)
