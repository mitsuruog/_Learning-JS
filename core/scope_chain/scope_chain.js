/**
 * 通常の変数スコープの確認
 */
var hoge = 'hoge', fuga = 'fuga';

console.log('global[hoge]->' + hoge);

(function(){
    var hoge = 'hogehoge';
    console.log('local[hoge]->' + hoge);
    //スコープチェーンでグローバル参照
    console.log('local[fuga]->' + fuga);
})();
console.log('global[hoge]->' + hoge);


/**
 * 参照型でスコープチェーンの確認
 */
var obj = {};
obj.hoge = 'obj.hoge';

console.log('global[obj.hoge]->' + obj.hoge);
(function(){
    //参照元プロパティの内容を変更
    obj.hoge = 'hogehoge';
    console.log('local[obj.hoge]->' + obj.hoge);
})();
//置き換わっている
console.log('global[obj.hoge]->' + obj.hoge);

//削除->undefinedの確認
delete obj.hoge;
console.log('global[obj.hoge]->' + obj.hoge);


/**
 * 参照型でwith文を使用したスコープチェーンの確認
 */
obj.hoge = 'obj.hoge';
console.log('global[obj.hoge]->' + obj.hoge);

with(obj){
    console.log('with[obj.hoge]->' + hoge);

    //これはobj.fugaではなくグローバルfugaを参照...か
    console.log('with[obj.fuga]->' + fuga);

    //参照元プロパティの内容を変更
    delete obj.hoge;
    //ななななんと！スコープチェーンを遡ってhogeを参照してしまう...orz
    console.log('with[obj.hoge]->' + hoge);
}
//ここではundefined
console.log('global[obj.hoge]->' + obj.hoge);


