# Web Worker

[Web Worker を使用する - Web developer guide | MDN](https://developer.mozilla.org/ja/docs/Web/Guide/Performance/Using_web_workers)

Workerはwindowとは異なるグローバルコンテキストで実行される。

# Workerの種類

2種類

- Dedicated Workers
  - Workerを生成したスクリプトのみがアクセスできる
- Shared Workers
  - 複数のスクリプトからアクセスできる

## Workerでできることできないこと

[Functions and classes available to Web Workers - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

- できないこと
  - 呼び出しもとのページに影響を与えること
    - DOM, オブジェクトの操作
- できること
  - 新しいWorkerの生成(ただし、親ページと同一生成元に限る)
  - WebSockets
  - XMLHttpRequest
  - IndexedDB(localStorageはダメ)
