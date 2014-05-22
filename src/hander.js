var gestureHandler, results;

results = [];

function touchHandler(event){
  if (event.type === 'touch') {
    results.push('start');
    return startHandler;
  } 
}

function dragHandler(event){
  if (event.type === 'drag') {
    results.push('drag');
    return dragHandler;
  }
}

function pinchHandler(event){
  if (event.type === 'pinch') {
    results.push('scale');
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
  }
}
gestureHandler = touchHandler;