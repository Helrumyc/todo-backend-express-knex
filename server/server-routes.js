const _ = require('lodash');
const todos = require('./database/todo-queries.js');
const users = require('./database/user-queries.js');
const teams = require('./database/teams-queries.js');

/// Create functions
function createToDo(req, data) {
  const protocol = req.protocol, 
    host = req.get('host'), 
    id = data.id;

  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: `${protocol}://${host}/${id}`
  };
}

function createUser(req, data){
  const protocol = req.protocol, 
  host = req.get('host'), 
  id = data.id;

  return {
    user_name: data.user_name,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    url: `${protocol}://${host}/user/${id}`
  }
}

function createTeam(req, data){
  const protocol = req.protocol, 
  host = req.get('host'), 
  id = data.id;

  return{
    name: data.name,
    url: `${protocol}://${host}/team/${id}`
  }
}

/// Gets
async function getAllTodos(req, res) {
  const allEntries = await todos.all();
  return res.send(allEntries.map( _.curry(createToDo)(req) ));
}

async function getAllUsers(req, res){
  const allEntries = await users.all();
  return res.send(allEntries.map( _.curry(createUser)(req) ));
}

async function getAllTeams(req, res){
  const allEntries = await teams.all();
  return res.send(allEntries.map( _.curry(createTeam)(req) ));
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.send(todo);
}

async function getUser(req, res) {
  const user = await users.get(req.params.id);
  return res.send(user);
}

async function getTeam(req, res) {
  const team = await teams.get(req.params.id);
  return res.send(team);
}

/// Posts
async function postTodo(req, res) {
  const created = await todos.create(req.body.title, req.body.order);
  return res.send(createToDo(req, created));
}

async function postUser(req, res) {
  const created = await users.create(
    req.body.user_name,
    req.body.email,
    req.body.first_name,
    req.body.last_name
  );
  return res.send(createUser(req, created));
}

async function postTeam(req, res) {
  const created = await teams.create(req.body.name);
  return res.send(createTeam(req, created));
}

/// Patches
async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.send(createToDo(req, patched));
}

async function patchUser(req, res) {
  const patched = await users.update(req.params.id, req.body);
  return res.send(createUser(req, patched));
}

async function patchTeam(req, res) {
  const patched = await teams.update(req.params.id, req.body);
  return res.send(createTeam(req, patched));
}

/// Deletes
async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.send(deletedEntries.map( _.curry(createToDo)(req) ));
}

async function deleteAllUsers(req, res) {
  const deletedEntries = await users.clear();
  return res.send(deletedEntries.map( _.curry(createUser)(req) ));
}

async function deleteAllTeams(req, res) {
  const deletedEntries = await teams.clear();
  return res.send(deletedEntries.map( _.curry(createTeam)(req) ));
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res.send(createToDo(req, deleted));
}

async function deleteUser(req, res) {
  const deleted = await users.delete(req.params.id);
  return res.send(createUser(req, deleted));
}

async function deleteTeam(req, res) {
  const deleted = await teams.delete(req.params.id);
  return res.send(createTeam(req, deleted));
}

/// Errors
function addErrorReporting(func, message) {
    return async function(req, res) {
        try {
            return await func(req, res);
        } catch(err) {
            console.log(`${message} caused by: ${err}`);

            // Not always 500, but for simplicity's sake.
            res.status(500).send(`Oops! ${message}.`);
        } 
    }
}

const toExport = {
    getAllTodos: { method: getAllTodos, errorMessage: "Could not fetch all todos" },
    getAllUsers: { method: getAllUsers, errorMessage: "Could not fetch all users" },
    getAllTeams: { method: getAllTeams, errorMessage: "Could not fetch all teams" },
    getTodo: { method: getTodo, errorMessage: "Could not fetch todo" },
    getUser: { method: getUser, errorMessage: "Could not fetch user" },
    getTeam: { method: getTeam, errorMessage: "Could not fetch team" },
    postTodo: { method: postTodo, errorMessage: "Could not post todo" },
    postUser: { method: postUser, errorMessage: "Could not post user" },
    postTeam: { method: postTeam, errorMessage: "Could not post team" },
    patchTodo: { method: patchTodo, errorMessage: "Could not patch todo" },
    patchUser: { method: patchUser, errorMessage: "Could not patch user" },
    patchTeam: { method: patchTeam, errorMessage: "Could not patch team" },
    deleteAllTodos: { method: deleteAllTodos, errorMessage: "Could not delete all todos" },
    deleteAllUsers: { method: deleteAllUsers, errorMessage: "Could not delete all users" },
    deleteAllTeams: { method: deleteAllTeams, errorMessage: "Could not delete all teams" },
    deleteTodo: { method: deleteTodo, errorMessage: "Could not delete todo" },
    deleteUser: { method: deleteUser, errorMessage: "Could not delete user" },
    deleteTeam: { method: deleteTeam, errorMessage: "Could not delete team" },
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;
