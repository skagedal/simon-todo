db.tasks.find().forEach (function (task) {
  print(task.text);
});
