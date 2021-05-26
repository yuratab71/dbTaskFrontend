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
        let arr = this.state.list;
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
            this.setState({
                sortedList: arr
            })
    }

    filterByAMD(){
        let arr = this.state.list.filter(el => el.categorie === "AMD");
        this.setState({
            sortedList: arr
        })
    }  
    filterByIntel(){
        let arr = this.state.list.filter(el => el.categorie === "Intel");
        this.setState({
            sortedList: arr
        })
    }

    update(){
        dbAPI.getData().then(data => {
            this.setState({
                list: data,
                sortedList: data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render () {
        return <>
        
                    <div className="optional-menu">
                        <div className="option-item">
                            <button className="option-button" onClick={this.handleSortRank.bind(this)}>Рейтинг</button>
                        </div>
                        <div className="option-item">
                            <button className="option-button" onClick={this.handleSortPrice.bind(this)}>Ціна</button>
                        </div>
                        <div className="option-item">
                            <button className="option-button" onClick={this.handleBack.bind(this)}>Усі</button>
                        </div>
                        <div className="option-item">
                            <button className="option-button" onClick={this.filterByAMD.bind(this)}>AMD</button>
                        </div>
                        <div className="option-item">
                            <button className="option-button" onClick={this.filterByIntel.bind(this)}>Intel</button>
                        </div>   
                    </div>
                    <div className="App">

                    {/* <div className="counter">
                        <span>Кількість: </span>{this.state.sortedList.length}
                    </div> */}
                    <div className="item-list">
                    {this.state.sortedList.map(el => {
                        return <GoodsCard upd={this.update.bind(this)} id={el._id} name={el.name} categorie={el.categorie} price={el.price} rating={el.rating} description={el.description}/>
                    })}
                    </div>

                    <div className="create-form">
                        <ItemCreatorForm upd={this.update.bind(this)}/>
                    </div>
                </div>
                </>
    }
}

export default Main;
