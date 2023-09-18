import http from '../https-commom.js'

class Auth{
    register(userInfo){
        return http.post('/register/', userInfo)
    }

    logging(userInfo){
        return http.post('/login/', userInfo)
    }
}

export default new Auth;