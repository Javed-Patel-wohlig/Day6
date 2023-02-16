
const validate = require('../schema/order-schema');

function Validator() {
    return (req, res, next) => {
        let sendResponse = false;
        const valid = validate(req.body);
        if(!valid) {
            const err = validate.errors.map(e => e.message);
            res.status(400).json(err);
            sendResponse = true;
        }
        if(!sendResponse) {
            next();
        }
    }
}

module.exports = Validator();