function createUser(execlib, ParentUser, dbops4sendermixinlib) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib,
    UserMixin = dbops4sendermixinlib.user;

  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
    UserMixin.call(this, prophash);
  }
  
  ParentUser.inherit(User, 
    lib.extend({}, require('../methoddescriptors/user'), dbops4sendermixinlib.methoddescriptors.user),
    [/*visible state fields here*/]/*or a ctor for StateStream filter*/
  );
  UserMixin.addMethods(User);

  User.prototype.__cleanUp = function () {
    UserMixin.prototype.destroy.call(this);
    ParentUser.prototype.__cleanUp.call(this);
  };

  return User;
}

module.exports = createUser;
