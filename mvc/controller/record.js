const res = require('express/lib/response');
const { record, checklist, connection, user } = require('../../database'); 

const create = async ({userId, heading, description, checklists}) => {
    const transaction = await connection.transaction(); 

    try {
        const newRecord = await record.create(
            {
                usuarioId: userId,
                titulo: heading,
                descricao: description
            }, 
            {
                transaction: transaction
        });
            
        if(checklists && checklists.length > 0) {
            for (const item of checklists) {
                await checklist.create({
                    notaId: newRecord.id,
                    descricao: item.description,
                    titulo: item.hasEnded
                }, 
                {
                    transaction: transaction
                });                                        
            }
        }  

        await transaction.commit();

        return await get(newRecord.id); 
    } catch (error) {
        await transaction.rollback();  
        
        throw error;
    }
}


const get = async (id = null, transaction = null) => {
    let result; 
    let include = [{
        model: user, 
        as: "user"
    }, 
    {
        model: checklist,
        as: "checklists"
    }];         

    if(id) {
        result = record.findOne({
            where: {id},
            include,
            transaction
        });         
    } else {
        result = await record.findAll({include, transaction});                 
    }

    return result; 
}

const update = async (id, heading, description, checklists = []) => {
    const transaction = await connection.transaction();
    try {
        const newRecord = await record.update({            
            titulo: heading,
            descricao: description
        },
        {
            where: {
                id: id
            }
        },
        transaction
        ); 

        if(checklists && checklists.length > 0) {        
            for (const item of checklists) {
                if(item.id) {
                    await checklist.update({                    
                        descricao: item.description,
                        concluida: item.hasEnded
                    },
                    {
                        where: {
                            id: item.id
                        }
                    });
               } else {
                   await checklist.create({
                       notaId: id, 
                       descricao: item.description,
                       concluida: item.hasEnded
                   }, 
                   transaction); 
               }
            }         
        }

        const updatedRecord = await get(id, transaction); 

        await transaction.commit();

        return updatedRecord; 
    } catch (error) {
        await transaction.rollback();  
        
        throw error;        
    }
}

const destroy = async (id) => {
    const transaction = await connection.transaction(); 
    
    try {
        await checklist.destroy({
            where: {
                notaId: id
            }, 
            transaction
        })
    
        await record.destroy({
            where: {
                id
            },
            transaction
        })  
        
        await transaction.commit();
    } catch (error) {        
        await transaction.rollback(); 
        
        throw error;        
    }
}

module.exports = { create, get, destroy, update }