const number1 = document.querySelector('#number1');
const number2 = document.querySelector('#number2');
const result = document.querySelector('.result');

if(!!window.Worker) {
  const worker = new Worker('worker.js');

  number1.addEventListener('change', () => {
    worker.postMessage([number1.value, number2.value]);
    console.log('Message posted to worker');
  });

  number2.addEventListener('change', () => {
    worker.postMessage([number1.value, number2.value]);
    console.log('Message posted to worker');
  });

  // Worker側からのメッセージハンドラ
  worker.addEventListener('message', (e) => {
    result.textContent = e.data;
    console.log('Message received from worker');
  });

  // workerからのエラーハンドラ
  worker.addEventListener('error', (e) => {
    console.log(`Error received from worker - cause:${e.message}, filename:${e.filename}`);
  });

} else {
  console.log('window.Worker is not supported');
}
