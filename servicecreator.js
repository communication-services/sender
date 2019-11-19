function createSenderService (execlib, ParentService, dbopsmixinlib, dbops4sendermixinlib) {
  'use strict';
  
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    execSuite = execlib.execSuite,
    taskRegistry = execSuite.taskRegistry,
    RemoteServiceListenerServiceMixin = execSuite.RemoteServiceListenerServiceMixin,
    DBOpsUsageMixin = dbopsmixinlib.service,
    DBOps4SenderMixin = dbops4sendermixinlib.service;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user'), dbops4sendermixinlib) 
    };
  }

  function SenderService(prophash) {
    ParentService.call(this, prophash);
    RemoteServiceListenerServiceMixin.call(this);
    DBOpsUsageMixin.call(this, prophash);
    DBOps4SenderMixin.call(this, prophash);
    this.sender = prophash.sender;
  }
  
  ParentService.inherit(SenderService, factoryCreator);
  RemoteServiceListenerServiceMixin.addMethods(SenderService);
  DBOpsUsageMixin.addMethods(SenderService);
  DBOps4SenderMixin.addMethods(SenderService);
  
  SenderService.prototype.__cleanUp = function() {
    this.sender = null;
    DBOps4SenderMixin.prototype.destroy.call(this);
    DBOpsUsageMixin.prototype.destroy.call(this);
    RemoteServiceListenerServiceMixin.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };

  SenderService.prototype.propertyHashDescriptor = {
    sender: {
      type: 'string'
    },
    communicationdbopspath: {
      type: ['string', 'array']
    }
  };
  
  return SenderService;
}

module.exports = createSenderService;
