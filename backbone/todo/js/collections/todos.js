// Todo Collection
// ----------

TODO.Collection.todoList = new Backbone.Collection.extend({
   
   //Model
   model: TODO.Model.todo,
   
   //localStorageのnamespase
   localStorage: new Store('todo-backbone'),
   
   //Collectionの中で完了しているものを抽出
   complated: function(){
        //CollectionのModelの中身をfilterする
        return this.filter(function(todo){
            //ここでtrueとなったもののみfliterの抽出対象となる
            return todo.get('complated');
        });
   },
   
   //Collectionの中で完了していないものを抽出
   remaining: function(){
       //without(arrays, 除外arrays)
       return this.without.apply( this, this.complated());
   },
   
   
});