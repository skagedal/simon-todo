# do "meteor mongo --url"
# then run "mongo 127.0.0.1:3001/meteor ./private/db-tool.js"
# (if that's the $HOST and $PORT and $PATH)

db.tasks.find({}).forEach (function (task) {
  print(task.text);
});
