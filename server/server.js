const app = require('./server-config.js');
const routes = require('./server-routes.js');

const port = process.env.PORT || 5000;

/// gets
app.get('/', routes.getAllTodos);
app.get('/user', routes.getAllUsers);
app.get('/:id', routes.getTodo);
app.get('/user/:id', routes.getUser);

/// posts
app.post('/', routes.postTodo);
app.post('/user', routes.postUser);

/// patches
app.patch('/:id', routes.patchTodo);
app.patch('/user/:id', routes.patchUser);

/// deletes
app.delete('/', routes.deleteAllTodos);
app.delete('/user', routes.deleteAllUsers);
app.delete('/:id', routes.deleteTodo);
app.delete('/user/:id', routes.deleteUser);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;