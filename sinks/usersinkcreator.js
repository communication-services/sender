function createUserSink(execlib, ParentSink, dbops4sendermixinlib) {
  'use strict';

  var lib = execlib.lib;

  function UserSink(prophash, client) {
    ParentSink.call(this, prophash, client);
  }
  
  ParentSink.inherit(UserSink, 
    lib.extend({}, require('../methoddescriptors/user'), dbops4sendermixinlib.methoddescriptors.user)
  );
  UserSink.prototype.__cleanUp = function () {
    ParentSink.prototype.__cleanUp.call(this);
  };
  return UserSink;
}

module.exports = createUserSink;
