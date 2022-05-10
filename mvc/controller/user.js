const { user } = require('../../database'); 
const jwt = require('jsonwebtoken'); 
const { secret } = require('../../config/security.json'); 

const create = async (name, email, password) => {
    let [created]  = await user.findOrCreate({
        defaults: {
            nome: name, 
            email: email, 
            senha: password
        }, 
        where: {
            email: email
        }        
    });
    
    return created; 
};

const update = async (id, name, password) => {
    await user.update(
        {
        nome: name,
        senha: password
        },
        {
            where: {
                id: id
            }  
        }                 
    ); 

    return await get(id); 
};

const get = async (id = null) => {
    const result = id ? await user.findByPk(id) : await user.findAll(); 

    return result; 
}

const destroy = async(id) => {
    await user.destroy({
        where: {
            id
        }
    })
}

const login = async (email, password) => {
    try {
        const client = await user.findOne({
            where: {
                email: email
            }
        });

        if(!client || password !== client.senha) {
            return false; 
        }

        return jwt.sign({id: client.id}, secret, {expiresIn: '24h'}); 
    } catch (error) {
        throw error;         
    }
}

module.exports = { create, update, get, destroy, login }; 