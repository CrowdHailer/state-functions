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
});