const app = require('./server-config.js');
const routes = require('./server-routes.js');

const port = process.env.PORT || 5000;

/// gets
app.get('/', routes.getAllTodos);
app.get('/user', routes.getAllUsers);
app.get('/team', routes.getAllTeams);
app.get('/:todo_id/assignee', routes.getAllAssignees);
app.get('/:id', routes.getTodo);
app.get('/user/:id', routes.getUser);
app.get('/team/:id', routes.getTeam);
app.get('/:todo_id/assignee/:user_id', routes.getAssignee);

/// posts
app.post('/', routes.postTodo);
app.post('/user', routes.postUser);
app.post('/team', routes.postTeam);
app.post('/:id/assignee/', routes.postAssignee);


/// patches
app.patch('/:id', routes.patchTodo);
app.patch('/user/:id', routes.patchUser);
app.patch('/team/:id', routes.patchTeam);

/// deletes
app.delete('/', routes.deleteAllTodos);
app.delete('/user', routes.deleteAllUsers);
app.delete('/team', routes.deleteAllTeams);
app.delete('/:id/assignee', routes.deleteAllAssignees);
app.delete('/:id', routes.deleteTodo);
app.delete('/user/:id', routes.deleteUser);
app.delete('/team/:id', routes.deleteTeam);
app.delete('/:id1/assignee/:id2', routes.deleteAssignee);


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;