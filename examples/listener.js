#!/usr/bin/env node
'use strict';
const rosnodejs = require('rosnodejs');
const hive_mind = rosnodejs.require('hive_mind').msg;

function listener() {
  // Register node with ROS master
  rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
      // Create ROS subscriber on the 'chatter' topic expecting String messages
      let sub = rosNode.subscribe('/chatter', hive_mind.Num,
        (data) => { // define callback execution
          rosnodejs.log.info('I heard: [' + data.num + ']');
        }
      );
    });
}

if (require.main === module) {
  // Invoke Main Listener Function
  listener();
}
