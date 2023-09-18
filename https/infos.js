import http from '../https-commom.js'

class Infos{
    create(infos){
        return http.post('/add_infos/', infos)
    }

    fetchall(){
        return http.get('/all_infos/')
    }
}

export default new Infos;