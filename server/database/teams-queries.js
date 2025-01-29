const knex = require("./connection.js");

async function all() {
    return knex('teams');
}

async function get(id) {
    const results = await knex('teams').where({ id });
    return results[0];
}

async function create(name) {
    const unique_id = crypto.randomUUID();
    const results = await knex('teams').insert({ unique_id, name }).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('teams').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('teams').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('teams').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}