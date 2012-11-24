// Todo Item View
// ----------
$(function() {

    console.log('TODO.View.todo');
    
    TODO.View.todo = Backbone.View.extend({

        tagName: 'li',
        input: $('.edit'),
        template: _.template($('#tmpl-item').html()),

        events: {
            'click .toggle': 'toggleComplated',
            'dbclick label': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },

        initialize: function(opts) {
            //this.todoList = opts.collection;
            this.model = opts.model;
            this.model.on('change', this.render, this);
            this.model.on('destory', this.remove, this);
        },
        
        render: function() {
            this.$el.html( this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));

            return this;
        },

        toggleComplated: function() {
            this.model.toggle();
        },

        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },

        close: function() {
            var val = this.input.val().trim();
            if (val) {
                this.model.save({
                    title: val
                });
            }
            else {
                this.clear();
            }
            this.$el.removeClass('editing');
        },
        
        updateOnEnter: function(e){
            if(e.which === 13){
                this.close();
            }
        },
        
        clear: function() {
            this.model.destory();
        }
    });

});