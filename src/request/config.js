import axios from 'axios';
import { Message } from 'element-ui';


const reqInstance = axios.create({
    // 后端接口
    // baseURL: '/api',
    baseURL: '/index',
    timeout: 10000,
});

reqInstance.interceptors.request.use(config => {
    return config
}, err => {
    console.log(err);
})

reqInstance.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    }
    return response
}, error => {
    Message.error(error.message);
});

export default reqInstance