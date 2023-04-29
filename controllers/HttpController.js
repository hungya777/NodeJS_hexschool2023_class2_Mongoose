const errorHandleService = require('../services/errorHandleService');
const successHandleService = require('../services/successHandleService');

const http = {
    cors (req, res) {
        successHandleService(res);
    },
    notFound (req, res) {
        errorHandleService(res, 404, "無此網站路由");
    }
}

module.exports = http;