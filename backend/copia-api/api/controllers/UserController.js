const Joi = require('joi');
const UtilService = require("../services/utilityService")
const JWTService = require("../services/jwtService")

module.exports = {

    login: async function (req, res) {
        try {
            const params = await schema.validate(req.allParams(), { abortEarly: false });
            if (params.error) {
                res.send({ status:1, error: params.error.details })
            } else {
                const user = await User.findOne({ where: { email: params.value['email'] } })
                if (!user) {
                    return res.ok({  status:1, error: "User does not exist" })
                }
                const matchedPassword = await UtilService.comparePassword(params.value['password'], user.password);
                if (!matchedPassword) {
                    return res.ok({  status:1, error: "Login failed" })
                }
                const token = JWTService.issuer({ user: user.id }, '1 day');
                const userDetails = await User.findOne({ where: { id: user.id } });
                return res.ok({  status:0, token: token, user: userDetails })
            }

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.badRequest({ error });
            }
            return res.serverError(error)
        }
    },


    signup: async function (req, res) {
        try {
            const params = await schema.validate(req.allParams(), { abortEarly: false });
            if (params.error) {
                res.send({ 'error': params.error.details })
            } else {
                const user = await User.findOne({ where: { email: params.value['email'] } })
                if (user) {
                    return res.ok({ Status:1, Error: "User alredy exist" })
                }
                const encPassword = await UtilService.hashPassword(params.value['password'])
                const results = await User.create({
                    email: params.value['email'],
                    password: encPassword,
                    first_name: params.value['first_name'],
                    last_name: params.value['last_name'],
                    gender: params.value['gender'],
                    date_of_birth: params.value['date_of_birth'],
                    profile_picture: params.value['profile_picture'],
                }).fetch();
                return res.ok({status: 0, user: results})
            }

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.badRequest({ error });
            }
            return res.serverError(error)
        }
    },

};



const schema = Joi.object({
    id: Joi.number(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(6).max(10),
    first_name: Joi.string().trim(),
    last_name: Joi.string().trim(),
    gender: Joi.string().trim(),
    date_of_birth: Joi.string().trim(),
    profile_picture: Joi.string().trim(),
    //active: Joi.boolean().trim(),
})

