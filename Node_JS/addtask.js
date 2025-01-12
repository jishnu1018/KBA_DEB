const rl=require('readline')

const rl1=rl.createInterface({
    input:process.stdin,
    output:process.stdout
});

let names=[]

function displaymenu(){
    console.log(
        'Choose an Option: \n',
        '1). add name \n',
        '2). Display \n',
        '3). quit \n'
    
    );
    
    rl1.question('Enter your choice(1-3): ',(choice)=>{
        handlechoice(choice);
    })
}


function handlechoice(choice){
    switch(choice){
        case '1':{
            rl1.question('Enter name to add: ', name=>{
                console.log(`\n Name added \n\n`);
                if(name!==' ')
                {names.push(name)}
                displaymenu(); 

            });
            break;

        }

        case '2':{
            if(names.length>0){
                console.log(names)
            }
            else{
                console.log("No values added \n\n");
                
            }
            displaymenu()
            break;
              
        }
        case '3':{
            console.log("exited")
            rl1.close();
        }
    }
}

displaymenu()
