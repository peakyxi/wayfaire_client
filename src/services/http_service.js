import axios from 'axios'


const http = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
}

export default http