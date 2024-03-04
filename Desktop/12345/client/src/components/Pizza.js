import React from 'react'
import '../food.css'
import { Button, Select } from 'antd'
export default function food({pizza}) {
  return (
    <div class="container">
      
   <div class="art-board">
         <div class="card">
            <div class="card__image">
            <img src={pizza.image} alt="/"></img>
            </div>
            <div class="card__info">
               <div class="car__info--title">
               <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>

                  <div className='card-row'>
                  <Button htmlType='submit' className='add-to-cart-btn'>Add to cart</Button>
                  <Select className='quantity' options={[
                     { value: '1', label: <span>1</span> },
                     { value: '2', label: <span>2</span> },
                     { value: '3', label: <span>3</span> },
                     { value: '4', label: <span>4</span> },
                     { value: '5', label: <span>5</span> },
                     { value: '6', label: <span>6</span> },
                     { value: '7', label: <span>7</span> },
                     { value: '8', label: <span>8</span> },
                     { value: '9', label: <span>9</span> },
                     { value: '10', label: <span>10</span> },
               ]} />   
               
               </div>
                           </div>
           
            </div>
         </div>
     
    

   </div>
   
</div>

    
  )
}

