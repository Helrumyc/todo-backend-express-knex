const knex = require("./connection.js");

async function all() {
    return knex('users');
}

async function get(id) {
    const results = await knex('users').where({ id });
    return results[0];
}

async function create(userName, email, firstName, lastName) {
    const unique_id = crypto.randomUUID();
    const results = await knex('users').insert({ 
        unique_id,
        user_name: userName,
        email,
        first_name: firstName,
        last_name: lastName
     }).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('users').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('users').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('users').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}