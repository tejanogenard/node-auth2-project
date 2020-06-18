const db = require("../database/connection.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    getAll,
};


function getAll(){
    return db('users')
}

function find() {
    return db("users").select("id", "username").orderBy("id");
}

// return the role name together with the user data
function findBy(filter) {
    return db("users").where(filter).orderBy("id");
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users").where({ id }).first();
}
