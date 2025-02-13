import React from 'react';
import './App.css'
import Demo from './Demo';
import Card from './Card';


const App = () => {
  
    const cardsData=[
      {
        title:"Card 1",
        text:"first card",
        customClasses:'bg-blue-600'
      },
      {
        title:"Card 2",
        text:"second card",
        customClasses:'bg-yellow-600'
      },
      {
        title:"Card 3",
        text:"third card",
        customClasses:'bg-red-600'
      }
    ]
return (
    <>
    <Demo/>

    {
      cardsData.map((card,index)=>(
        <Card key={index}
        title={card.title}
        text={card.text}
        customClasses={card.customClasses}/>
      ))
    }
    
    
    </>
  )
}

export default App