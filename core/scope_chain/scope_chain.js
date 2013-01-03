/**
 * 通常の変数スコープの確認
 */
var hoge = 'hoge', fuga = 'fuga';

console.log('g[hoge]->' + hoge);

(function(){
    var hoge = 'hogehoge';
    console.log('l[hoge]->' + hoge);
    //スコープチェーンでグローバル参照
    console.log('l[fuga]->' + fuga);
})();
console.log('g[hoge]->' + hoge);


/**
 * 参照型でスコープチェーンの確認
 */
var obj = {};
obj.hoge = 'obj.hoge';

console.log('g[obj.hoge]->' + obj.hoge);
(function(){
    //参照元プロパティの内容を変更
    obj.hoge = 'hogehoge';
    console.log('l[obj.hoge]->' + obj.hoge);
})();
//置き換わっている
console.log('g[obj.hoge]->' + obj.hoge);

//削除->undefinedの確認
delete obj.hoge;
console.log('g[obj.hoge]->' + obj.hoge);


/**
 * 参照型でwith文を使用したスコープチェーンの確認
 */
obj.hoge = 'obj.hoge';
console.log('g[obj.hoge]->' + obj.hoge);

with(obj){
    console.log('w[obj.hoge]->' + hoge);
    //参照元プロパティの内容を変更
    delete obj.hoge;
    //ななななんと！スコープチェーンを遡ってhogeを参照してしまう...orz
    console.log('w[obj.hoge]->' + hoge);
}
//ここではundefined
console.log('g[obj.hoge]->' + obj.hoge);


