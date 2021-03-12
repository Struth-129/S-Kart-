const {check, validationResult} = require('express-validator');
exports.validationSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is Required'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 character long'),
];

exports.validationSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is Required'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 character long'),
]

exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        // return res.send({errors:errors.array()})
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next();
}