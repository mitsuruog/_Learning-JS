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
        //TODO 3つliがあること。順番がただしいこと。
        expect($('#guest-list>li')).toHaveText('one');
    });
});