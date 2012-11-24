describe('Tests todo model', function(){
    beforeEach(function() {
        this.todoList = new TODO.Collection.todoList();

        //backbone.localStorageではmodel.localStorage || model.collection.localStorageじゃないとダメ
        //でないとajaxが動くと言う罠あり
        this.todo = new TODO.Model.todo({
            collection: this.todoList
        });
    });
    
    it('create model with default value', function() {
        expect(this.todo.getTitle()).toEqual('');
        expect(this.todo.getComplated()).toEqual(false);
    });
    
    it('set values to model', function() {
        this.todo.set({
            title: 'meeting',
            complated: true
        });
        expect(this.todo.getTitle()).toEqual('meeting');
        expect(this.todo.getComplated()).toEqual(true);
    });
    
    it('toggle', function() {
        this.todo.set({
            title: 'tests toggle'
        });
        
        this.todo.toggle();
        expect(this.todo.getComplated()).toEqual(true);
        
        //localStorage
        expect(this.todo.collection.localStorage.find(this.todo)).toBeDefined();
        expect(this.todo.collection.localStorage.find(this.todo).complated).toEqual(true);
        
        this.todo.toggle();
        expect(this.todo.getComplated()).toEqual(false);
        //localStorage
        expect(this.todo.collection.localStorage.find(this.todo).complated).toEqual(false);
        
    });    
    
    it('clear', function() {
        //setでもいいかと思ったらchangeイベントしか発生せず、syncが呼び出されないためlocalstorageにaddされなかった
        this.todo.save({
            title: 'tests clear'
        });
        expect(this.todo.collection.localStorage.find(this.todo)).not.toBeNull();
        expect(this.todo.collection.localStorage.find(this.todo).title).toBe('tests clear');
        
        this.todo.clear();
        expect(this.todo.collection.localStorage.find(this.todo)).toBeNull();
    });   
});