const Joi = require('joi');
const UtilService = require("../services/utilityService")
const JWTService = require("../services/jwtService");

const products = [
  { id: 1, name: 'BlueBand', desc: '500g',price:70,url:'data:image/jpeg;base64,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'},
  {id: 2, name: 'Sugar', desc: '1Kg', price:110,url:'https://plus.co.ke/wp-content/uploads/2020/11/Kabras-Sugar.jpg'},
  {id:3, name:'Golden Fry',desc:'1ltr', price:180, url:'https://copia.co.ke/wp-content/uploads/2021/05/KF075_3403.jpg'},
  {id:4 , name:'Rice',desc:'1kg', price: 100, url:'https://i.pinimg.com/originals/26/2f/ab/262fabbece266f9b787aee8020c2863e.jpg'},
  {id:5, name:'Mango Juice', desc:'1ltr', price: 300, url:'https://cdn.shopify.com/s/files/1/0018/8327/5325/products/MANGO-JUICE_1L_front_335x700.jpg?v=1591866662'}]


module.exports = {
  

  /**
   * `ProductsController.getAll()`
   */
  getAll: async function (req, res) {
    return res.send(
      products
     
    );
  },

  /**
   * `ProductsController.getOne()`
   */
  getOne: async function (req, res) {
    return res.json({
      todo: 'getOne() is not implemented yet!'
    });
  },

  /**
   * `ProductsController.delete()`
   */
  delete: async function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },

  /**
   * `ProductsController.update()`
   */
  update: async function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  /**
   * `ProductsController.create()`
   */
    
  create: async function (req, res) {
    try {
      const params = await schema.validate(req.allParams(), { abortEarly: false });
      if (params.error) {
          res.send({ 'error': params.error.details })
      } else {
        var product= Products.create({
          name: params.value['name'],
          price: params.value['price'],
          description: params.value['description'],
        })
          
              
         
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

  name: Joi.string().trim().required(),
  price: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  quantity: Joi.number().required(),
 
})
