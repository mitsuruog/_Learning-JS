var MY = {
    Model: {},
    View : {},
    Collection: {}
};

MY.View.task = new Backbone.View.extend({
    el: '.tasks',
    template: _.template($('#tmpl-task-list').html()),    
    itemTemplate: _.template($('#tmpl-task').html()),
    initialize: function(opts){
        this.render();
    },
    render: function () {
        var self = this;
        var html = this.template({
            items: MY.View.tasks,
            itemTemplate: this.itemTemplate
        });
        
        self.$el.hide().empty();
        $(this.el).append(html);
        self.$el.fadeIn();
        
    }
});

MY.Collection.tasks = new Backbone.Collection.extend({
    Model: MY.Model.task
});

MY.Model.task = new Backbone.Model.extend({
    defaults: {},
    initialize: function(attrs, opts){},
    validate: function(attrs){}
});