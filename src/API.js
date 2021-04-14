const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:5000/",
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
    updateItem(body) {
        return instance.put(``, JSON.parse(body)).then(responce => {
            return responce.data;
        })
    }
}

export {dbAPI};