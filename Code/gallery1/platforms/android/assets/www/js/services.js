angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'BEACH',
    lastText: 'You on your way?',
    face: 'img/beach.jpg'
  }, {
    id: 1,
    name: 'MAC',
    lastText: 'Hey, it\'s me',
    face: 'img/mac.jpg'
  }, {
    id: 2,
    name: 'LEAf',
    lastText: 'I should buy a boat',
    face: 'img/leaf.jpg'
  }, {
    id: 3,
    name: 'WNDOWS7',
    lastText: 'Look at my mukluks!',
    face: 'img/windows7.jpg'
  }, {
    id: 4,
    name: 'WINDOWS10',
    lastText: 'This is wicked good ice cream.',
    face: 'img/windows10.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
