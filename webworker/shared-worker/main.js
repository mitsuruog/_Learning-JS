const number1 = document.querySelector('#number1');
const number2 = document.querySelector('#number2');
const result = document.querySelector('.result');

if(!!window.SharedWorker) {
  var worker = new SharedWorker('worker.js');
  worker.port.start();

  number1.addEventListener('change', () => {
    worker.port.postMessage([number1.value, number2.value]);
    console.log('Message posted to worker');
  });

  number2.addEventListener('change', () => {
    worker.port.postMessage([number1.value, number2.value]);
    console.log('Message posted to worker');
  });

  // Worker側からのメッセージハンドラ
  worker.port.addEventListener('message', (e) => {
    result.textContent = e.data;
    console.log('Message received from worker');
  });

  // workerからのエラーハンドラ
  worker.port.addEventListener('error', (e) => {
    console.log(`Error received from worker - cause:${e.message}, filename:${e.filename}`);
  });

} else {
  console.log('window.Worker is not supported');
}
