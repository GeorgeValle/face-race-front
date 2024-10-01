import axios from 'axios';


// await axios.post('http://localhost:8080/api/session/login', {
            //     email: email,
            //     pasword: password
            // })
            // .then((response)=>response.json)
            // .then((data)=>dispatch(addUser(data)))
            // .catch((error)=>console.log(error))

const UseAxiosPost =  (url, payload) => {

    try{

    }catch(error){

    }
    const request = axios.post(url, payload)
    return request;
}

export default UseAxiosPost