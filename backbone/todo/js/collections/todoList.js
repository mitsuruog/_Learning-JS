// Todo Collection
// ----------
$(function() {

    console.log('TODO.Collection.todoList');

    TODO.Collection.todoList = Backbone.Collection.extend({

        //Model
        model: TODO.Model.todo,

        //localStorageのnamespase
        //localStorage: new Store('todo-backbone'),
        localStorage: new Backbone.LocalStorage('todo-backbone'),
        
        initialize: function(opts){
//            this.model = opts.model;
//            this.order = this.todoList.nextOrder();
        },
        
        //Collectionの中で完了しているものを抽出
        complated: function() {
            //CollectionのModelの中身をfilterする
            return this.filter(function(model) {
                //ここでtrueとなったもののみfliterの抽出対象となる
                return model.get('complated');
            });
        },

        //Collectionの中で完了していないものを抽出
        remaining: function() {
            //without(arrays, 除外arrays)
            return this.without.apply(this, this.complated());
        },

        nextOrder: function() {
            if(!this.length){
                return 1;
            }
            return this.last().get('order') + 1;
        },
        
        conparator: function(model){
            return model.get('order');
        }
    });

});