import React from 'react';
import {dbAPI} from "./API";
import "./App.css"

function ItemCreatorForm({upd}) {
    
    const createHandler = (e) => {
        e.preventDefault();
        let data = e.target;
        if (!data.name.value || data.name.value.length > 32){
            alert("Вкажіть назву,не більше 32 символа")
            return null;
        }
        if (!data.price.value || data.price.value % 1 !== 0) {
            alert("Вкажіть ціну, або змініть некоректну")
            return null;
        }

        let obj = {
            name: data.name.value,
            categorie: data.categorie.value,
            price: data.price.value,
            rating: data.rating.value,
            description: data.description.value
        }

        dbAPI.addItem(JSON.stringify(obj)).then(data => {
            console.log(data);
            upd();
        })
    }
    
    return (
        <form className="add_form" onSubmit={createHandler}>
            
            <div className="form_option">
                <div>Назва</div><input className="form_input" name="name" type="text"/>
            </div>
            <div className="form_option">
                <div>Категорія</div><select className="form_input" name="categorie">
                    <option value="AMD">AMD</option>
                    <option value="Intel">Intel</option>
                </select>
            </div>
            <div className="form_option">
                <div>Ціна</div><input className="form_input" name="price" type="text"/>
            </div>
            <div className="form_option">
                <div>Рейтинг</div><select className="form_input" name="rating">
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <div className="form_option">
                    <div>Опис</div><textarea className="form_input" name="description"/>
                </div>
            </div>
            <div className="add-block">
           <button className="option-button">Додати</button>
           </div>
        </form>
    )
}

export default ItemCreatorForm;
