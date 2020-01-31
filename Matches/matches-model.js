const db = require("../data/config");

const findUserMatches = async (user_id) => {
    // join job.company_id to user.id to link it to company, grab job title, company name, etc
    return db("user_matches").where({user_id, match: true}).select()
}

const findCompanyMatches = (company_id) => {
    return db("user_matches as m").join("jobs as j", "j.id", "m.job_id").join("users as c", "j.company_id", "c.id").where({"c.id": company_id, "m.match": true}).select("m.user_id", "j.id as job_id", "j.description", "j.type")
}

module.exports = {
    findCompanyMatches,
    findUserMatches
}