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
  }
}
gestureHandler = touchHandler;