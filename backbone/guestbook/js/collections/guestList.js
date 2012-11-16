$(function(){

GUEST.Collection.guestList = Backbone.Collection.extend({
   initialize: function(models, opts){
        this.bind('add', opts.view.render); 
   }
});

});