const knex = require("./connection.js");

async function all() {
    return knex('assignee');
}

async function get(userID, todoID) {
    const results = await knex('assignee').where({ user_id: userID, todo_id: todoID });
    return results[0];
}

async function getAll(todoID){
    const results = await knex('assignee').where({ todo_id: todoID }).returning('*');
    return results;
}

async function create(userID, todoID) {
    const results = await knex('assignee').insert({ user_id: userID, todo_id: todoID }).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('assignee').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('assignee').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('assignee').del().returning('*');
}

module.exports = {
    all,
    get,
    getAll,
    create,
    update,
    delete: del,
    clear
}