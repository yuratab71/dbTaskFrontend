import React, {useState} from 'react'
import "./App.css";
import {dbAPI} from "./API";

function GoodsCard({id, name, categorie, price, rating}) {
    const [editMode, switchEditMode] = useState(false);

    const updateHandler = (e) => {
        //e.preventDefault();
        let data = e.target;
        if (!data.name.value || data.name.value.length > 16){
            console.log("error");
            return null;
        }
        if (data.price.value % 1 !== 0) {
            console.log("error");
            return null;
        }

        let obj = {
            id: id,
            name: data.name.value,
            categorie: data.categorie.value,
            price: data.price.value,
            rating: data.rating.value
        }

        dbAPI.updateItem(JSON.stringify(obj)).then(data => {
            console.log(data);
        })
    }

    const deleteSubmit = (e) => {
        dbAPI.deleteItem(id).then(data => {
            console.log(data);
        })
    }
    
    return (
        <div className="card" key={id}>
            <div>
                <h3><span>Назва: </span>{name}</h3>
            </div>
            <div>
                <ul>
                    <li><span>Категорія: </span>{categorie}</li>
                    <li><span>Ціна: </span>{price}</li>
                    <li><span>Рейтинг: </span>{rating}</li>
                </ul>
            </div>
            <div className="delete-form">
                <form onSubmit={deleteSubmit} className="delete-form">
                    <button>Видалити</button>
                </form>

            </div>
            {editMode 
            ?<div>
                    <button onClick={() => switchEditMode(false)}>Close</button> 
                    <form onSubmit={updateHandler}>
            <div>
                <span>Назва</span><input name="name" type="text"/>
            </div>
            <div>
                <span>Категорія</span><select name="categorie">
                    <option value="food">Food</option>
                    <option vlaue="drinks">Drinks</option>
                </select>
            </div>
            <div>
                <span>Ціна</span><input name="price" type="text"/>
            </div>
            <div>
                <span>Рейтинг</span><select name="rating">
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

           <button>Додати</button>
        </form>
            </div>
            
            :
            <div>
                <button onClick={() => switchEditMode(true)}>Edit</button>   
            </div>
        }
        </div>
    )
}

export default GoodsCard
