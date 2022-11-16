import axios from "axios";   
var api_url = "https://crypto-trust.herokuapp.com/"; 
 
var API = axios.create({
    baseURL: api_url, 
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    }); 


class APIService { 
    /* for get data specific Item*/
    async getItem(url) {
        return new Promise(async (resolve, reject) => {
            await API.get(url,{}).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    }

    /* for create specific Item*/
    async postItem(url, item) { 
        return new Promise(async (resolve, reject) => {
            await API.post(url, item).then(res => { resolve(res); }).catch(error => { reject(error);});
        }); 
    }

    /* for delete specific Item*/
    async deleteItem(url) {
        return new Promise(async (resolve, reject) => {
            await API.delete(url,{}).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    }

    /* for update specific Item*/
    async patchItem(url, item) { 
        return new Promise(async (resolve, reject) => {
            await API.patch(url, item).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    } 
}
export default APIService;