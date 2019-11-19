function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['.',
        'communication:dbopsmixin:lib',
        'communication:dbops4sendermixin:lib'
      ]
    },
    sinkmap: {
      dependencies: ['.',
        'communication:dbops4sendermixin:lib'
      ]
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
