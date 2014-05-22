var gestureHandler, results;

results = [];

function touchHandler(event){
  if (event.type === 'touch') {
    results.push('start');
    return startHandler;
  } 
}

function startHandler(event){
  if (event.type === 'drag') {
    results.push('drag');
  } else if (event.type === 'pinch') {
    results.push('scale');
  } else if (event.type === 'release') {
    results.push('end');
  }
}
gestureHandler = touchHandler;