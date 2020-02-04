const db = require("../data/config");

const find = () => {
    return db("jobs").select();
}

const findJob = (id) => {
    return db("jobs").where({id}).first();
}

const add = (job) => {
   return db("jobs").insert(job).returning('*');
}

const remove = (id) => {
    return db("jobs").where({id}).del();
}

const update = async (id, changes) => {
   return db("jobs").where({id}).update(changes).returning('*');
}

const findBy = (filter) => {
    return db("jobs").where(filter);
}

module.exports = {
    find,
    findJob,
    add,
    remove,
    update,
    findBy
}