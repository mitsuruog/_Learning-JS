// サブWorkerをインポートする
// pathは親スクリプトからの相対パス
importScripts('error-handler.js');

addEventListener('message', (e) => {
  console.log('Message received from script');

  // 数値ではない場合にエラーとする
  if(isNaN(parseInt(e.data[0], 10)) || isNaN(parseInt(e.data[1], 10))) {
    throw new Error(`数値ではありません`);
  }

  setTimeout(() => {
    postMessage(`Result: ${e.data[0] * e.data[1]}`);
  }, 1000);

});
