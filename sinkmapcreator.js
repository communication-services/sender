function sinkMapCreator(execlib, ParentSinkMap, dbops4sendermixinlib) {
  'use strict';
  var sinkmap = require('./websinkmapcreator')(execlib, ParentSinkMap, dbops4sendermixinlib);
  //add roles that should not be visible to the browser
  return sinkmap;
}

module.exports = sinkMapCreator;
