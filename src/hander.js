var gestureHandler, results;

results = [];

var actions = {
  touch: function(event){
    results.push('start');
    return startHandler;
  }
};

function touchHandler(event){
  if (actions[event.type]) {
    return actions[event.type](event);
  } else {
    return arguments.callee;
  }
}

function dragHandler(event){
  if (event.type === 'drag') {
    results.push('drag');
    return dragHandler;
  } else if (event.type === 'release') {
    results.push('end');
    return touchHandler;
  } else {
    return dragHandler;
  }
}

function pinchHandler(event){
  if (event.type === 'pinch') {
    results.push('scale');
    return pinchHandler;
  } else if (event.type === 'release') {
    results.push('end');
    return touchHandler;
  } else {
    return pinchHandler;
  }
}

function startHandler(event){
  if (event.type === 'drag') {
    results.push('drag');
    return dragHandler;
  } else if (event.type === 'pinch') {
    results.push('scale');
    return pinchHandler;
  } else if (event.type === 'release') {
    results.push('end');
    return touchHandler;
  } else {
    return startHandler;
  }
}
gestureHandler = touchHandler;