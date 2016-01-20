fetch('/fetch/data.json').then((response) => {
  if (response.ok) {
    response.json().then((data) => {
      console.log(data);
    });
  } else {
    console.log(`response error: ${response.status}`);
  }
}, (err) => {
  console.log(`fetch failed: ${err}`);
});
