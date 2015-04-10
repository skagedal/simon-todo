// Update old "tags" that are just a string to an array of that string.

// First tried to use $type, but that does not work because of
// how that handles arrays:
// http://docs.mongodb.org/manual/reference/operator/query/type/#arrays
//
// 2 means BSON type String, see:
// http://docs.mongodb.org/manual/reference/operator/query/type/

db.tasks.find({ $where: 'isString(this.tags)' }).forEach(function (task) {
  print(task.text, ": ", task.tags);
  task.tags = [ task.tags ];
  db.tasks.save(task);
});
