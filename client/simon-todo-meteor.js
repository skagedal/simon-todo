Meteor.subscribe("tasks");

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
});

Template.body.helpers({
  tasks: function () {
    return Tasks.find({ finishedAt: null},
                      { sort: { priority: -1}});
  },
  incompleteCount: function () {
    return Tasks.find({ finishedAt: null }).count();
  },
  finishedTasks: function () {
    return Tasks.find({ finishedAt: { $ne: null } });
  }
});

Template.task.helpers({
  shortdesc: function () {
    return this.text;
  }
});

Template.body.events({
  "submit .new-task": function (event) {
    // This function is called when the new task form is submitted

    var data = Util.parseTodo(event.target.text.value);

    Meteor.call("addTask", data.text, data.tags, data.pro);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});

Template.task.events({
  "click .done": function () {
    Meteor.call("setFinished", this._id);
  },
  "click .prio_up": function () {
    Meteor.call("increasePriority", this._id);
  },
  "click .prio_down": function () {
    Meteor.call("decreasePriority", this._id);
  },
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
