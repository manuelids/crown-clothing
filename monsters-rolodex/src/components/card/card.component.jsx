import React from 'react';
import './card.styles.css'

//Exportable Card component
export const Card = (props) => (
    //for a string format equivalent this symbol is required `
    //className for the css class attribute html equivalent
    <div className="card-container">
        <img 
            alt="monster" 
            src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`} 
        />
        <h3>{props.monster.name}</h3>
        <p>{props.monster.email}</p>
    </div>
)