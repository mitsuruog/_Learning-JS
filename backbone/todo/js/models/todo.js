// Todo Model
// ----------

TODO.Model.todo = new Backbone.Model.extend({

    //初期値
    defaults:{
        title : '',
        complated: false
    },
    
    //Toggle時にTodoのstateをcomplatedにする
    toggle : function(){
        this.save({
            complated: !(this.get('complated'))
        });
    }
});