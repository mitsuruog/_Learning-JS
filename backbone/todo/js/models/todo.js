// Todo Model
// ----------
$(function() {

    console.log('TODO.Model.todo');

    TODO.Model.todo = Backbone.Model.extend({

        //初期値
        defaults: {
            title: '',
            complated: false
        },

        initialize: function(opts){
            this.collection = opts.collection;
            this.order = opts.collection.nextOrder();
        },

        //Toggle時にTodoのstateをcomplatedにする
        toggle: function() {
            this.save({
                complated: !(this.get('complated'))
            });
        },
        
        clear: function(){
            this.destroy();
        },
        
        getTitle: function(){
            return this.get('title');
        },
        getComplated: function(){
            return this.get('complated');
        },
    });

});