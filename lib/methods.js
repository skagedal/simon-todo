authorize = function (taskId, meth) {
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }
};

Meteor.methods({
  addTask: function (text, tags, priority) {
    authorize ();
    // FIXME check arguments
    // should use: http://docs.meteor.com/#/full/auditargumentchecks
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
    authorize (taskId);
    // FIXME boundary
    Tasks.update(taskId, {$inc: {priority: 1}});
  },
  decreasePriority: function (taskId) {
    authorize (taskId);
    // FIXME boundary
    Tasks.update(taskId, {$inc: {priority: -1}});
  },
  setFinished: function (taskId) {
    authorize (taskId);
    Tasks.update(taskId, { $set: { finishedAt: new Date() } });
  }
});
