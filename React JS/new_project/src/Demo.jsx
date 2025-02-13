import React from 'react'

const Demo = () => {

  const name= "MESSI"
  const a=8;
  const b=1;

  const array=["NFS","FIFA","RDR","GOW"];
  
  const result =true


  return (
    <>
    <div>Demo</div>
    <p>Holla {name}</p>
    <p>The sum of {a} + {b} = {a+b} </p>
    <br/>
    <ul>
      {array.map((games,index)=>(
        <li key={index}>{games}</li>
      ))}
    </ul>
    <br />
    {result? <p className="text-blue-800 font-bold">Yeah bro</p>: <p className="text-red-500 font-bold">failed bro</p> }
  </>
  )
}

export default Demo