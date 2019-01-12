module.exports = (callee) => {
    function API_Call(callee) {
        var OPTIONS = {
            headers: {'Content-Type': 'application/json'},
            url: null,
            body: null
        };
        const PORT = 3001;
        const BASE_PATH = '/routes/v1';
        const HOST = 'http://localhost';
        (callee);
        return{
            login: (user_id, password, callback) => {
                OPTIONS.url = HOST + ':' + PORT + BASE_PATH + '/login';
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "password": passworrd
                });
                request.post(OPTIONS, (err, res, result) => {
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            join: (id, password, callback) => {
                OPTIONS.url = HOST + ':' + PORT + BASE_PATH + '/join';
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "password": passworrd
                });
                request.post(OPTIONS, (err, res, result) => {
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    function statusCodeErrorHandler(statusCode, callback, data) {
        switch(statusCode){
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }
    var INSTANCE;
    if(INSTANCE === undefined){
        INSTANCE = new API_Call(callee);
    }
    return INSTANCE;
}