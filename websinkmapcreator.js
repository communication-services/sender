function webSinkMapCreator(execlib, ParentSinkMap, dbops4sendermixinlib) {
  'use strict';
  var sinkmap = new (execlib.lib.Map);
  sinkmap.add('service', require('./sinks/servicesinkcreator')(execlib, ParentSinkMap.get('service')));
  sinkmap.add('user', require('./sinks/usersinkcreator')(execlib, ParentSinkMap.get('user'), dbops4sendermixinlib));
  
  return sinkmap;
}

module.exports = webSinkMapCreator;
