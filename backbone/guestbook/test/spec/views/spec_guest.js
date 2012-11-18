describe('Tests guestbook view', function() {
    beforeEach(function() {
        //DOM for rendering
        jasmine.getFixtures().fixturesPath = 'fixtures';
        loadFixtures('render.html');
        this.view = new GUEST.View.guest();
    });
    afterEach(function() {
        this.view.remove();
    });

    it('create initialize view', function() {
        expect(this.view.guests).toBeDefined();
        expect(this.view.guests.length).toBe(0);
    });

    describe('render', function() {

        it('rendering one', function() {
            this.view.render(new GUEST.Model.guest({
                name: 'one'
            }));

            expect($('#guest-list')).toContain('li');
            expect($('#guest-list>li')).toHaveText('one');
        });

        it('rendering three', function() {
            this.view.render(new GUEST.Model.guest({
                name: 'one'
            }));
            this.view.render(new GUEST.Model.guest({
                name: 'two'
            }));
            this.view.render(new GUEST.Model.guest({
                name: 'three'
            }));
            expect($('#guest-list')).toContain('li');
            expect($('#guest-list>li').length).toBe(3);
            expect($('#guest-list>li').eq(0)).toHaveText('one');
            expect($('#guest-list>li').eq(1)).toHaveText('two');
            expect($('#guest-list>li').eq(2)).toHaveText('three');
        });
    });

    describe('showPrompt', function() {

        it('no enter anything at the prompt', function() {
            //spy
            spyOn(window, 'prompt').andReturn('');

            //do test
            $('#new-guest').click();

            expect(this.view.guests.length).toBe(0);
        });

        it('added to the model after enter something at the prompt', function() {
            //spy
            spyOn(window, 'prompt').andReturn('mitsuruog');

            //do test
            $('#new-guest').click();

            expect(this.view.guests.length).toBe(1);
            expect(this.view.guests.models[0].get('name')).toBe('mitsuruog');
        });
    });
});