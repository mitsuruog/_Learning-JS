$(function(){

GUEST.View.guest = Backbone.View.extend({

    el: '#guestbook',
    events:{
        'click #new-guest': 'showPrompt'
    },
    
    initialize: function(){
        this.guests = new GUEST.Collection.guestList(null, {
                view: this
            });
    },
    
    showPrompt: function(){
        var guestName = prompt('What your name?');
        if(guestName){
            var model = new GUEST.Model.guest({
                    name: guestName
                });
            this.guests.add(model);
        }
    },
    
    render: function(model){
        var tmpl = _.template($('#tmpl-guest').html());
        this.$el.find('#guest-list').append(tmpl(model.toJSON()));
    }
});

});