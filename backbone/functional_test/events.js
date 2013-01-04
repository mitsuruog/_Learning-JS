describe('Tests Backbone.Events', function() {

  //Spies
  var spies, obj;

  beforeEach(function() {

    obj = {};
    spies = jasmine.createSpyObj('called', ['hello', 'hellome', 'helloyou', 'all', 'helloonce', 'backbone']);

    //Mixin
    _.extend(obj, Backbone.Events);

    //spy on
    obj.on('hello', spies.hello);
    obj.on('hello:me', spies.hellome);
    obj.on('hello:you', spies.helloyou);
    obj.on('all', spies.all);

    //0.9.9
    if (Backbone.VERSION === '0.9.9') {
      obj.once('hello:once', spies.helloonce);
      Backbone.on('backbone', spies.backbone);
    }

  });

  it('Test Basic event', function() {
    obj.trigger('hello');
    expect(spies.hello).toHaveBeenCalled();
  });

  it('Test event with :', function() {
    obj.trigger('hello:me');
    expect(spies.hellome).toHaveBeenCalled();

    obj.trigger('hello:you');
    expect(spies.helloyou).toHaveBeenCalled();
  });

  it('Test event all', function() {

    obj.trigger('hello');
    expect(spies.hello).toHaveBeenCalled();
    expect(spies.all).toHaveBeenCalled();

    obj.trigger('hello:me');
    expect(spies.hellome).toHaveBeenCalled();
    expect(spies.all).toHaveBeenCalled();

    obj.trigger('hello:you');
    expect(spies.helloyou).toHaveBeenCalled();
    expect(spies.all).toHaveBeenCalled();
  });

  it('Test event off', function() {

    //off
    obj.off('hello:me');

    obj.trigger('hello:me');
    expect(spies.hellome).not.toHaveBeenCalled();

    obj.trigger('hello:you');
    expect(spies.helloyou).toHaveBeenCalled();
  });

  it('Test multi event trigger', function() {

    obj.trigger('hello:me hello:you');

    expect(spies.hellome).toHaveBeenCalled();
    expect(spies.helloyou).toHaveBeenCalled();
  });

  /**
   * 0.9.9以降
   */
  if (Backbone.VERSION === '0.9.9') {
    describe('Tests Backbone.Events >= 0.9.9', function() {
      it('Test event once', function() {

        obj.trigger('hello:once');
        expect(spies.helloonce).toHaveBeenCalled();
        expect(spies.helloonce.callCount).toBe(1);

        obj.trigger('hello:once');
        expect(spies.helloonce).toHaveBeenCalled();
        expect(spies.helloonce.callCount).toBe(1);

      });

      /**
       * Backbone.onのテスト
       */
      it('Test Backbone.on', function() {
        
        expect(spies.backbone).not.toHaveBeenCalled();
        Backbone.trigger('backbone');
        expect(spies.backbone).toHaveBeenCalled();
        expect(spies.backbone.callCount).toBe(1);
        
      });
    });
  }

});
