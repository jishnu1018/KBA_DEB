const rl=require('readline')

const rl1=rl.createInterface({
    input:process.stdin,
    output:process.stdout
});
let array1=[]

function displaymenu(){
    console.log(
        '1). Type \n',
        '2). Amount \n',
        '3). Date \n',
        '4).Show all \n',
        '5).quit'
    );
    
    rl1.question('Enter your choice : ',(choice)=>{
        selectchoice(choice);
    })
}

total=0;
function selectchoice(choice){
    switch(choice){
        case '1':{
            console.log(
                'a). Hospital\n',
                'b). Vehicle \n',
                'c). Home \n',
                'd).software \n',
                'e).other'
            );
            rl1.question('enter the type: ',(option)=>{
                selected1(option);
                displaymenu()
            })
            break;
            };

        case '2':{
            rl1.question('enter the amount: ',(amount)=>{
                   array1.push(amount);
                   total += parseInt(amount);
                   displaymenu();
                   
                     
            })
            break;
        }

        case '3':
           { rl1.question('Enter the date: ',(date)=>{
                array1.push(date); 
                displaymenu();  
            });
            break;}

            case '4':{
                console.log(array1);
                console.log("sum is: ",total);
                displaymenu()
                break;
            }

        case '5':
            {   
                console.log("quited");
                
                rl1.close()
            }


    }
}

function selected1(option){
    switch (option) {
        case 'a':{
            h="Hospital"
            array1.push(h)
            break;
        }
        case 'b':{
            v="Vehicle"
            array1.push(v)
            break;
        }
        case 'c':{
            ho="Home"
            array1.push(ho)
            break;
        }
        case 'd':{
            s="Software"
            array1.push(s)
            break;
        }
        case 'e':{
            rl1.question('enter the type: ',(oty)=>{
                array1.push(oty);
                displaymenu(); 
            }) 
            break;
        }
        
    }
}
displaymenu()