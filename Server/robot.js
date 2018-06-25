  // Connecting to ROS
  // -----------------

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Publishing a Topic
  // ------------------

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  var twist1 = new ROSLIB.Message({
    linear : {
      x : 0.25,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x : -0.0,
      y : -0.0,
      z : -0.0
    }
  });
  var twist2 = new ROSLIB.Message({
    linear : {
      x : -0.25,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x : -0.0,
      y : -0.0,
      z : -0.0
    }
  });
  var twist3 = new ROSLIB.Message({
    linear : {
      x : 0.0,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x : -0.0,
      y : -0.0,
      z : -0.5
    }
  });
  var twist4 = new ROSLIB.Message({
    linear : {
      x : 0.0,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x :  0.0,
      y : -0.0,
      z : 0.5
    }
  });
  var twist = new ROSLIB.Message({
    linear : {
      x : 0.0,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x : -0.0,
      y : -0.0,
      z : -0.0
    }
  });
  cmdVel.publish(twist);

  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/listener',
    messageType : 'std_msgs/String'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    listener.unsubscribe();
  });

  // Calling a service
  // -----------------

  var addTwoIntsClient = new ROSLIB.Service({
    ros : ros,
    name : '/add_two_ints',
    serviceType : 'rospy_tutorials/AddTwoInts'
  });

  var request = new ROSLIB.ServiceRequest({
    a : 1,
    b : 2
  });

  addTwoIntsClient.callService(request, function(result) {
    console.log('Result for service call on '
      + addTwoIntsClient.name
      + ': '
      + result.sum);
  });

  // Getting and setting a param value
  // ---------------------------------

  ros.getParams(function(params) {
    console.log(params);
  });

  var maxVelX = new ROSLIB.Param({
    ros : ros,
    name : 'max_vel_y'
  });

  maxVelX.set(0.8);
  maxVelX.get(function(value) {
    console.log('MAX VAL: ' + value);
  });

  function myFunction(direction) {

    switch(direction) {
    case 1:
        cmdVel.publish(twist1);
        break;
    case 2:
        cmdVel.publish(twist2);
        break;
    case 3:
		cmdVel.publish(twist3);
        break;
    case 4:
		cmdVel.publish(twist4);
        break;
    case 5:
		cmdVel.publish(twist);
        break;
    default:
         cmdVel.publish(twist);
        
    } 
  }