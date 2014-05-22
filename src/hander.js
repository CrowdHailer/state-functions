var gestureHandler, results;

results = [];

var actions = {
  touch: function(event){
    results.push('start');
    return startHandler;
  },
  drag: function(event){
    results.push('drag');
    return dragHandler;
  },
  pinch: function(event){
    results.push('scale');
    return pinchHandler;
  },
  release: function(event){
    results.push('end');
    return touchHandler;
  }
};

function touchHandler(event){
  var localActions = _.limit('touch')(actions);
  if (localActions[event.type]) {
    return localActions[event.type](event);
  } else {
    return arguments.callee;
  }
}

function dragHandler(event){
  var localActions = _.limit('drag', 'release')(actions);
  if (localActions[event.type]) {
    return localActions[event.type](event);
  } else {
    return arguments.callee;
  }
}

function pinchHandler(event){
  var localActions = _.limit('pinch', 'release')(actions);
  if (localActions[event.type]) {
    return actions[event.type](event);
  } else {
    return arguments.callee;
  }
}

function startHandler(event){
  var localActions = _.limit('drag', 'pinch', 'release')(actions);
  if (localActions[event.type]) {
    return localActions[event.type](event);
  } else {
    return arguments.callee;
  }
}
gestureHandler = touchHandler;