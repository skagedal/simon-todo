Tasks = new Mongo.Collection("tasks");

function parseTodo (text) {
    var reTags = /\[([^\]]*)\]/g;
    var tags = [], matches;
    while (matches = reTags.exec(text)) {
        var betweenBrackets = matches[1];
        var someTags = betweenBrackets.split(",");
        var n = someTags.length;
        for (i = 0; i < n; i++)
            tags.push(someTags[i].trim());
    }

    var rePrio = /\(([0-9])\)/;
    var prioMatch, prio = null;
    if (prioMatch = text.match(rePrio))
        prio = +prioMatch[1];

    text = text.replace(reTags, '').replace(rePrio, '').trim();

    return {tags: tags, prio: prio, text: text};
}

if (Meteor.isClient) {
  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('YYYY-MM-DD');
  });

  Template.body.helpers({
    tasks: function () {
      return Tasks.find({ finishedAt: null},
                        { sort: { priority: -1}});
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

      console.log("calling parseTodo");
      var data = parseTodo(event.target.text.value);
      console.log("and now i have");

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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
