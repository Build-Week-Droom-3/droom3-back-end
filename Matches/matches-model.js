const db = require("../data/config");

const findUserMatches = async (user_id) => {
    // join job.company_id to user.id to link it to company, grab job title, company name, etc
    return db("user_matches").where({user_id, match: true}).select()
}

const findCompanyMatches = (company_id) => {
    return db("user_matches as m").join("jobs as j", "j.id", "m.job_id").join("users as c", "j.company_id", "c.id").where({"c.id": company_id, "m.match": true}).select("m.user_id", "j.id as job_id", "j.description", "j.type")
}

const findCompanyUserMatches = (company_id) => {
    return db("user_matches as m").join("jobs as j", "j.id", "m.job_id").join("users as u", "j.company_id", "u.id").where({"u.id": company_id}).select("m.user_id", "j.id as job_id", "j.description", "j.type");
}

const findMatchById = (id) => {
    return db("user_matches").where({id}).first();
}

const addUserMatch = async (match) => {
    const [id] = await db("user_matches").insert(match);

    return findMatchById(id);
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
    addCompanyMatch
}