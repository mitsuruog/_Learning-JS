// サブWorkerをインポートする
// pathは親スクリプトからの相対パス
//importScripts('error-handler.js');
console.log('hoge');

addEventListener('connect', (e) => {

  var port = e.ports[0];
  console.log(`Enable connect: port=${port}`);

  port.addEventListener('message', (e) => {
    console.log('Message received from script');

    // 数値ではない場合にエラーとする
    if(isNaN(parseInt(e.data[0], 10)) || isNaN(parseInt(e.data[1], 10))) {
      throw new Error(`数値ではありません`);
    }

    port.postMessage(`Result: ${e.data[0] * e.data[1]}`);

  });
});
