authorize = function (taskId, meth) {
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }
};

Meteor.methods({
  addTask: function (text, tags, priority) {
    check (text, String);
    check (tags, [String]);
    check (priority, Match.OneOf (null, Match.Where(Util.isValidPriority)));
    authorize ();

    var justNow = new Date();
    Tasks.insert({
	text: text,
	tags: tags,
	createdAt: justNow,
	updatedAt: justNow, 
	finishedAt: null,
	priority: priority === null ? 5 : priority,
    });
  },
  increasePriority: function (taskId) {
    check (taskId, String);
    authorize (taskId);
    // FIXME boundary
    Tasks.update(taskId, {$inc: {priority: 1}});
  },
  decreasePriority: function (taskId) {
    check (taskId, String);
    authorize (taskId);
    // FIXME boundary
    Tasks.update(taskId, {$inc: {priority: -1}});
  },
  setFinished: function (taskId) {
    check (taskId, String);
    authorize (taskId);
    Tasks.update(taskId, { $set: { finishedAt: new Date() } });
  }
});
