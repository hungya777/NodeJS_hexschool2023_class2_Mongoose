const headers = require('./headerService');

const errorHandleService = (res, errCode = 400, err = "欄位未填寫正確，或無此 todo ID") => {
    res.writeHead(errCode, headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": err.errors? err.errors : err
    }));
    res.end();
}

module.exports = errorHandleService;