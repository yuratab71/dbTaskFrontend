const axios = require("axios");

const instance = axios.create({
    baseURL: "https://salty-ravine-76503.herokuapp.com/",
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

const dbAPI = {
    getData(){
        return instance.get("").then(responce => {
            return responce.data;
        });
    },

    deleteItem(id){
        return instance.delete(`${id}`).then(responce => {
            return responce.data;
        })
    },

    addItem(body) {
        return instance.post("", JSON.parse(body)).then(responce => {
            return responce.data;
        })
    },
    updateItem(id, body) {
        return instance.put(`${id}`, body).then(responce => {
            return responce.data;
        })
    }
}

export {dbAPI};