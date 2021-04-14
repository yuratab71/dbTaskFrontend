import React from 'react';
import {dbAPI} from "./API";

function ItemCreatorForm() {
    
    const createHandler = (e) => {
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
            name: data.name.value,
            categorie: data.categorie.value,
            price: data.price.value,
            rating: data.rating.value
        }

        dbAPI.addItem(JSON.stringify(obj)).then(data => {
            console.log(data);
        })
    }
    
    return (
        <form onSubmit={createHandler}>
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
    )
}

export default ItemCreatorForm;
