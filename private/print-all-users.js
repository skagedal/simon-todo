db.users.find().forEach (function (user) {
  print(user.username || '<'+user._id+'>');
});
