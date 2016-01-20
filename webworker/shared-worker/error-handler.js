addEventListener('error', (e) => {
  console.log(`Error occurred from worker - cause:${e.message}, filename:${e.filename}`);
  // e.preventDefault()するとスクリプト側にエラーは通知されない
  // e.preventDefault();
});
