const db = require("../data/config");

const findUserMatches = async (user_id) => {
    return db("user_matches as m").join("users as u", "u.id", "m.user_id").join("jobs as j", "j.id", "m.job_id").where({"u.id":user_id, "m.match": true}).select("m.id","j.id as job_id", "j.company_id", "j.name as title", "j.type", "j.description");
}

const findCompanyMatches = (company_id) => {
    return db("user_matches as m").join("jobs as j", "j.id", "m.job_id").join("users as c", "c.id", "j.company_id").where({"c.id": company_id, "m.match": true}).select("m.id", "m.user_id", "j.id as job_id", "j.description", "j.type")
}

const findCompanyUserMatches = (company_id) => {
    return db("user_matches as m").join("jobs as j", "j.id", "m.job_id").join("users as u", "j.company_id", "u.id").where({"u.id": company_id}).select("m.user_id", "j.id as job_id", "j.name as title","j.description", "j.type");
}

const findMatchById = (user_id) => {
    return db("user_matches as m").join("users as u", "u.id", "m.user_id").join("jobs as j", "j.id", "m.job_id").where({"u.id":user_id, "m.match": true}).first("m.id")
}

const findById = (id) => {
    return db("user_matches").where({id}).first();
}

const addUserMatch = async (match) => {
    return db("user_matches").insert(match).then(id => findById(id[0]));
}

const addCompanyMatch = async (id) => {
    let match = await db("user_matches").where({id}).first();
    match.match = true;
    return match;
}

module.exports = {
    findCompanyMatches,
    findUserMatches,
    findCompanyUserMatches,
    addUserMatch,
    addCompanyMatch,
    findMatchById
}