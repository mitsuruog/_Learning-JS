describe('Tests guestbook model', function() {
    beforeEach(function() {
        this.guest = new GUEST.Model.guest();
    });
    
    it('create model with default value', function() {
        expect(this.guest.get('name')).toEqual(null);
    });
    
    it('set name to model', function() {
        this.guest.set({name: 'mitsuruog'});
        expect(this.guest.get('name')).toEqual('mitsuruog');
    });
    
    it('fire event when the model name changed', function() {
        //spy
        var spy = jasmine.createSpy('-change event callback-');
        this.guest.on('change', spy);
        
        //do test
        this.guest.set({name: 'mitsuruog'});
        expect(spy).toHaveBeenCalled();
    });    
});