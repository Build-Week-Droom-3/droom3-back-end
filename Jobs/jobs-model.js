const db = require("../data/config");

const find = () => {
    return db("jobs").select();
}

const findJob = (id) => {
    return db("jobs").where({id}).first();
}

const add = async (job) => {
    const [id] = await db("jobs").insert(job);
    return findJob(id);
}

const remove = (id) => {
    return db("jobs").where({id}).del();
}

const update = async (id, changes) => {
    await db("jobs").where({id}).update(changes);

    return findJob(id);
}

const findBy = (filter) => {
    return db("jobs").where(filter).first();
}

module.exports = {
    find,
    findJob,
    add,
    remove,
    update,
    findBy
}