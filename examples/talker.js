#!/usr/bin/env node
'use strict';
const rosnodejs = require('rosnodejs');
const hive_mind = rosnodejs.require('hive_mind').msg;

function talker() {
  // Register node with ROS master
  rosnodejs.initNode('/talker_node')
    .then((rosNode) => {
      // Create ROS publisher on the 'chatter' topic with String message
      let pub = rosNode.advertise('/chatter', hive_mind.Num);
      let count = 0;
      const msg = new hive_mind.Num();
      // Define a function to execute every 100ms
      setInterval(() => {
        // Construct the message
        msg.num = count;
        // Publish over ROS
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info('I said: [' + msg.num + ']');
        ++count;
      }, 100);
    });
}

if (require.main === module) {
  // Invoke Main Talker Function
  talker();
}
