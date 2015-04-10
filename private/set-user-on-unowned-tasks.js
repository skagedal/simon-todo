// Will set the 'user' field on any task that does not have it 
// to the oldest user in the database

function firstUserId() {
  var users = db.users.find().sort({createdAt: 1});
  if (! users.hasNext())
    return nil;
  var firstUser = users.next();
  return firstUser._id;
}

function setUserOnUnownedTasks(userId) {
  db.tasks.update({ user: { $exists: false } }, 
		  { $set: { user: userId } },
		  { multi: true });
}

var userId = firstUserId();
if (! userId) {
  print ('ERROR: No user in database');
  quit();
}

setUserOnUnownedTasks(userId);
