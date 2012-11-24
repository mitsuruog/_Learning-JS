// Todo Aplication
// ----------
$(function() {

    console.log('TODO.View.main');
    
    TODO.View.main = Backbone.View.extend({

        el: '#todoapp',

        stateTemplate: _.template($('#tmpl-stats').html()),

        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #toggle-all': 'toggleAllComplate',
            'click #clear-complated': 'clearComplated'
        },

        initialize: function(opts) {
            this.todoList = opts.todoList;
            this.todo = opts.todo;

            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.footer = this.$('footer');
            this.$main = this.$('#main');

            this.todoList.on('add', this.addOne, this);
            this.todoList.on('reset', this.addAll, this);
            this.todoList.on('all', this.render, this);

            this.todoList.fetch();

        },

        render: function() {
            var complated = this.todoList.complated().length;
            var remaining = this.todoList.remaining().length;
            
            if(this.todoList.length){
                this.$main.show();
                this.footer.show();
                this.footer.html(this.stateTemplate({
                    complated: complated,
                    remaining: remaining
                }));
            }else{
                this.$main.hide();
                this.footer.hide();
            }
            
            this.allCheckbox.checked = !remaining;
        },

        addOne: function(todo) {
            var view = new TODO.View.todo({
                model: todo
            });
            $('#todo-list').append(view.render().el);
        },

        addAll: function() {
            this.$('#todo-list').html('');
            this.todoList.each(this.addOne, this);
        },

        //新規TODO作成
        createOnEnter: function(e) {
            //Enterキーのみ
            if (e.which !== 13 || !(this.input.val().trim())) {
                return;
            }
            this.todoList.create({
                title: this.input.val().trim(),
                complated: false
            });
            this.input.val('');
        },

        clearComplated: function() {
            _.each(this.todoList.complated(), function(todo) {
                todo.clear();
            });
            return false;
        },

        toggleAllComplate: function() {
            var complated = this.allCheckbox.checked;
            this.todoList.each(function(todo) {
                todo.save({
                    'complated': complated
                });
            });
        }

    });

});