const db = require("../data/config");

const find = () => {
    return db("users").select("id", "username", "name", "occupation", "company", "description");
}

const findUser = (id) => {
    return db("users").where({id}).first("id", "username","name", "occupation", "company", "interest", "experience", "description");
}

const add =(user) => {
    return db("users").insert(user).returning("*");
}

const remove = (id) => {
    return db("users").where({id}).del();
}

const update = async (id, changes) => {
   return db("users").where({id}).update(changes).returning("id", "username","name", "occupation", "company", "interest", "experience", "description");
}

const findBy = (filter) => {
    return db("users").where(filter).first();
}

const findCompanies = () => {
    return db("users").where({company: true}).select("id", "username", "name", "description")
}

const findAllUsers = () => {
    return db("users").where({company: false}).select("id", "username", "name", "occupation", "interest", "experience", "description");
}

const findCompany = (id) => {
    return db("users").where({id, company: true}).first();
}

module.exports = {
    find,
    findUser,
    add,
    remove,
    update,
    findBy,
    findCompanies,
    findAllUsers,
    findCompany
}