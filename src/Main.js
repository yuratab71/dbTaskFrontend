import React from 'react';
import {dbAPI} from "./API.js"; 
import GoodsCard from "./GoodsCard";
import ItemCreatorForm from './itemCreatorForm.js';

class Main extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            list: [],
            sortedList: []
        }
    }

    componentDidMount(){
        dbAPI.getData().then(data => {
            this.setState({
                list: data,
                sortedList: data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleBack(){
        console.log("i work")
        let arr = this.state.list;
        console.log(arr);
        this.setState({
            sortedList: arr
        })
    }

    handleSortRank(){
        let arr = this.state.list;

            for (let i = 0; i < arr.length; i++){
                for (let j = i + 1; j < arr.length; j++) {
                    let a = arr[i];
                    let b = arr[j];
                    if (a.rating >= b.rating ){
                        arr[j] = arr[i];
                        arr[i] = b
                    }
                }
            }
            console.log(arr);
            this.setState({
                sortedList: arr
            })
    }

    handleSortPrice(){
        let arr = this.state.list;

            for (let i = 0; i < arr.length; i++){
                for (let j = i + 1; j < arr.length; j++) {
                    let a = arr[i];
                    let b = arr[j];
                    if (a.price >= b.price ){
                        arr[j] = arr[i];
                        arr[i] = b
                    }
                }
            }
            console.log(arr);
            this.setState({
                sortedList: arr
            })
    }

    filterByDrink(){
        let arr = this.state.list.filter(el => el.categorie === "Drinks");
        this.setState({
            sortedList: arr
        })
    }  
    filterByFood(){
        let arr = this.state.list.filter(el => el.categorie === "food");
        this.setState({
            sortedList: arr
        })
    }

    render () {
        return  <div>
                    <div className="optional-menu">
                        <p>Main Page</p>
                        <button onClick={this.handleSortRank.bind(this)}>Сортувати за рейтингом</button>
                        <button onClick={this.handleSortPrice.bind(this)}>Сортувати за ціною</button>
                        <button onClick={this.handleBack.bind(this)}>Усі</button>
                        <button onClick={this.filterByFood.bind(this)}>Food</button>
                        <button onClick={this.filterByDrink.bind(this)}>Drinks</button>
                    </div>
                    <div>
                        <span>Кількість: </span>{this.state.sortedList.length}
                    </div>
                    {this.state.sortedList.map(el => {
                        return <GoodsCard id={el.id} name={el.name} categorie={el.categorie} price={el.price} rating={el.rating}/>
                    })}

                    <div className="create-form">
                        <ItemCreatorForm/>
                    </div>
                </div>
    }
}

export default Main;
