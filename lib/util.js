Util = {
  // Find all the tags and priority declarations in a command.
  // Tags are written like [foo], or multiple tags with
  // [foo, bar].  Priorities are written with a single digit
  // in parentheses, like (5).  For example,
  // parseTodo("[dishes, kitchen] Wash dishes (5)") would return:
  // {tags: ['dishes', 'kitchen'], prio: 5, text: "Wash dishes"}

  parseTodo: function (text) {
    check (text, String);

    var reTags = /\[([^\]]*)\]/g;
    var tags = [], matches;
    while (matches = reTags.exec(text)) {
      var betweenBrackets = matches[1];
      var someTags = betweenBrackets.split(",");
      var n = someTags.length;
      for (i = 0; i < n; i++)
        tags.push(someTags[i].trim());
    }

    var rePrio = /\(([0-9]|10)\)/;
    var prioMatch, prio = null;
    if (prioMatch = text.match(rePrio))
      prio = +prioMatch[1];

    text = text.replace(reTags, '').replace(rePrio, '').trim();

    return {tags: tags, prio: prio, text: text};
  },

  isValidPriority: function (num) {
    check (num, Match.Integer);
    return (num >= 0 && num <= 10);
  }
};

