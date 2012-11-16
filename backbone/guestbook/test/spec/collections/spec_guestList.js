describe('Tests guestList collection', function(){
    
    beforeEach(function(){
        this.view = new GUEST.View.guest();
        //stub
        spyOn(this.view, 'render').andCallFake(function(){
                return null;
            });
            
        this.guestList = new GUEST.Collection.guestList(null, {view: this.view});
    });
    
    it('Can add model instance as objects and arrays', function(){
        expect(this.guestList.length).toBe(0);
        
        this.guestList.add(new GUEST.Model.guest({name: 'one'}));
        expect(this.guestList.length).toBe(1);

        this.guestList.add(new GUEST.Model.guest({name: 'two'}));
        this.guestList.add(new GUEST.Model.guest({name: 'three'}));
        expect(this.guestList.length).toBe(3);
    });
    
    it('fire view.render event when the model add', function() {
        this.guestList.add(new GUEST.Model.guest({name: 'one'}));
        expect(this.view.render).toHaveBeenCalled();
    });    

});