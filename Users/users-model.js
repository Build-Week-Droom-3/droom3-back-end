const db = require("../data/config");

const find = () => {
    return db("users").select("id", "username", "first_name", "last_name", "occupation");
}

const findUser = (id) => {
    return db("users").where({id}).first("id", "username","first_name", "last_name", "occupation", "interest", "experience", "description");
}

const add = async (user) => {
    const [id] = await db("users").insert(user);
    return findUser(id);
}

const remove = (id) => {
    return db("users").where({id}).del();
}

const update = async (id, changes) => {
    await db("users").where({id}).update(changes);

    return findUser(id);
}

const findBy = (filter) => {
    return db("users").where(filter).first();
}

module.exports = {
    find,
    findUser,
    add,
    remove,
    update,
    findBy
}