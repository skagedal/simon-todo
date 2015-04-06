if (Meteor.isClient) {

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

      var justNow = new Date();
      Tasks.insert({
        text: data.text,
        tags: data.tags,
        createdAt: justNow,
        updatedAt: justNow,
        finishedAt: null,
        priority: data.prio === null ? 5 : data.prio,
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.task.events({
    "click .done": function () {
      Tasks.update(this._id, {$set: {finishedAt: new Date()}});
    },
    "click .prio_up": function () {
      // FIXME should be capped (on server)
      Tasks.update(this._id, {$inc: {priority: 1}});
    },
    "click .prio_down": function () {
      // FIXME should be capped (on server)
      Tasks.update(this._id, {$inc: {priority: -1}});
    },
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

