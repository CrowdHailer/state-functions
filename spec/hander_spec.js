describe('handler', function(){
  beforeEach(function(){
    results = [];
    gestureHandler = touchHandler;
  });
  it('should call start after a touch event', function(){
    gestureHandler({type: 'touch'});
    expect(results).toEqual(['start']);
  });
  it('should have made no call after a drag event', function(){
    gestureHandler({type: 'drag'});
    expect(results).toEqual([]);
  });
  it('should call start only once', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler({type: 'touch'});
    expect(results).toEqual(['start']);
  });
  it('should call drag after touch handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler({type: 'drag'});
    expect(results).toEqual(['start', 'drag']);
  });
  it('should call scale after pinch handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler({type: 'pinch'});
    expect(results).toEqual(['start', 'scale']);
  });
  it('should call end after release handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler({type: 'release'});
    expect(results).toEqual(['start', 'end']);
  });
  it('should call multiple drag after first', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'drag'});
    gestureHandler = gestureHandler({type: 'drag'});
    expect(results).toEqual(['start', 'drag', 'drag']);
  });
  it('should call multiple scales after first', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'pinch'});
    gestureHandler = gestureHandler({type: 'pinch'});
    expect(results).toEqual(['start', 'scale', 'scale']);
  });
  it('should not call scale after first drag', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'drag'});
    gestureHandler = gestureHandler({type: 'pinch'});
    expect(results).toEqual(['start', 'drag']);
  });
  it('should not call drag after first pinch', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'pinch'});
    gestureHandler = gestureHandler({type: 'drag'});
    expect(results).toEqual(['start', 'scale']);
  });
  it('should be ready to start after end events', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'release'});
    gestureHandler = gestureHandler({type: 'touch'});
    expect(results).toEqual(['start', 'end', 'start']);
  });
  it('should be ready to start after dragend events', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'drag'});
    gestureHandler = gestureHandler({type: 'release'});
    gestureHandler = gestureHandler({type: 'touch'});
    expect(results).toEqual(['start', 'drag', 'end', 'start']);
  });
  it('should be ready to start after pinchend events', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'pinch'});
    gestureHandler = gestureHandler({type: 'release'});
    gestureHandler = gestureHandler({type: 'touch'});
    expect(results).toEqual(['start', 'scale', 'end', 'start']);
  });
  it('should work after invalid events', function(){
    gestureHandler = gestureHandler({type: 'drag'});
    gestureHandler = gestureHandler({type: 'touch'});
    expect(results).toEqual(['start']);
  });
  it('should ignore unknown events in the start handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'other'});
    gestureHandler = gestureHandler({type: 'drag'});
    expect(results).toEqual(['start', 'drag']);
  });
  it('should ignore unknown events in the drag handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'drag'});
    gestureHandler = gestureHandler({type: 'other'});
    gestureHandler = gestureHandler({type: 'drag'});
    expect(results).toEqual(['start', 'drag', 'drag']);
  });
  it('should ignore unknown events in the pinch handler', function(){
    gestureHandler = gestureHandler({type: 'touch'});
    gestureHandler = gestureHandler({type: 'pinch'});
    gestureHandler = gestureHandler({type: 'other'});
    gestureHandler = gestureHandler({type: 'pinch'});
    expect(results).toEqual(['start', 'scale', 'scale']);
  });
});