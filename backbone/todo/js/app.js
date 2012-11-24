var TODO = {
    Model: {},
    Collection: {},
    View: {},
    Router: {}
}

$(function() {
    
    console.log('TODO.app');
        
    var todo = new TODO.Model.todo();
    
    var todoList = new TODO.Collection.todoList({
        model: todo
    });
    
    todo.order = todoList.nextOrder;
    
    new TODO.View.main({
        todoList: todoList,
        todo: todo
    });
});