var source, template, data;

function compile(source, data){
  var template = Handlebars.compile(source);
  var result = template(data);
  console.log(result);
}


/**
 * 通常の使い方
 * {{name}} 通常
 * {{#kids}}{{/kids}} コンテキスト指定
 */
source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
 
data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
             
compile(source, data);


/**
 * カスタムヘルパー登録
 * {{ここにカスタムヘルパーを書く}}
 */
Handlebars.registerHelper('link_to', function() {
  return "<a href='" + this.url + "'>" + this.body + "</a>";
});

source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>";

data = { posts: [{url: "/hello-world", body: "Hello World!"}] };

compile(source, data);


/**
 * パス指定
 * {{../company.name}}でコンテキスト内をパスのように参照できる
 */
source = "{{#person}}{{name}} - {{../company.name}}{{/person}}";

data = {"person": { "name": "Alan" }, "company": {"name": "Rad, Inc." } };

compile(source, data);


/**
 * ヘルパーにパスが文字列のパラメータを渡たせる
 */
Handlebars.registerHelper('link_to_string', function(title, options) {
  return "<a href='/posts" + this.url + "'>" + title + "!</a>"
});

source = "<ul>{{#posts}}<li>{{{link_to_string \"Post\"}}}</li>{{/posts}}</ul>";

data = { posts: [{url: "/hello-world", body: "Hello World!"}] };

compile(source, data);


/**
 * ブロックヘルパー
 * options.fn(this)することで子ブロック(今回は{{name}})を実行する
 */
Handlebars.registerHelper('link', function(options) {
  return '<a href="/people/' + this.id + '">' + options.fn(this) + '</a>';
});

source = "<ul>{{#people}}<li>{{#link}}{{name}}{{/link}}</li>{{/people}}</ul>";

data = { "people": [
    { "name": "Alan", "id": 1 },
    { "name": "Yehuda", "id": 2 }
  ]};

compile(source, data);


/**
 * パーシャルヘルパー
 * {{> link_parts}}で部分的なヘルパー呼び出し。
 * 文字列かコンパイルされたテンプレートである必要がある
 */
Handlebars.registerPartial('link_parts', '<a href="/people/{{id}}">{{name}}</a>');
 
source = "<ul>{{#people}}<li>{{> link_parts}}</li>{{/people}}</ul>";

data = { "people": [
    { "name": "Alan", "id": 1 },
    { "name": "Yehuda", "id": 2 }
  ]};
  
compile(source, data);
