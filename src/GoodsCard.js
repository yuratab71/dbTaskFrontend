import React, {useState} from 'react'
import "./App.css";
import {dbAPI} from "./API";

function GoodsCard({upd, id, name, categorie, price, rating, description}) {
    const [editMode, switchEditMode] = useState(false);
    const updateHandler = (e) => {
        e.preventDefault();
        let data = e.target;
        if (!data.name.value || data.name.value.length > 32){
            alert("Вкажіть назву не більше 32 символів");
            return null;
        }
        if ( !data.price.value || (data.price.value % 1 !== 0)) {
            alert("Введіть, або змініть некоректну ціну");
            return null;
        }

        let obj = {
            name: data.name.value,
            categorie: data.categorie.value,
            price: data.price.value,
            rating: data.rating.value,
            description: data.description.value
        }
        dbAPI.updateItem(id, obj).then(data => {
            upd();
        })
    }

    const deleteSubmit = (e) => {
        e.preventDefault();
        dbAPI.deleteItem(id).then(data => {
            console.log(data);
            upd();
        })
    }
    
    return (
        <>
        <div className="cardOut" key={id}>
            <div className="card">
            <div>
                <h2>{name}</h2>
            </div>
            <div className="card-small">

            
            <div>
                <ul>
                    <li><span>Категорія: </span>{categorie}</li>
                    <li><span>Ціна: </span>{price}</li>
                    <li><span>Рейтинг: </span>{rating}</li>
                </ul>
            </div>
            <div className="delete-form">
                <form onSubmit={deleteSubmit} className="delete-form">
                    <button className="option-button-item">Видалити</button>
                </form>

            </div>
            
        </div>
        {editMode 
            ?<div>
                    <button className="option-button-item" onClick={() => switchEditMode(false)}>Close</button> 
                    <form onSubmit={updateHandler}>
            <div>
                <span>Назва</span><input defaultValue={name} name="name" type="text"/>
            </div>
            <div>
                <span>Категорія</span><select defaultValue={categorie} name="categorie">
                    <option value="AMD">AMD</option>
                    <option vlaue="Intel">Intel</option>
                </select>
            </div>
            <div>
                <span>Ціна</span><input defaultValue={price} name="price" type="text"/>
            </div>
            <div>
                <span>Рейтинг</span><select defaultValue={rating} name="rating">
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <span>Опис</span><textarea defaultValue={description} type="text" name="description"/>
            </div>

           <button className="option-button-item">Додати</button>
        </form>
            </div>
            
            :
            <div className="edit-button">
                <button className="option-button-item" onClick={() => switchEditMode(true)}>Edit</button>   
            </div>
        }
        </div>
        
        <div className="description">
            {description}
        </div>
        </div>
        </>
    )
}

export default GoodsCard
