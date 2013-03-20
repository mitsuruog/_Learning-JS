/**
 * 自動販売機モジュール
 */
var vending = function() {

  //argumentsは改行を取る
  var _arguments = arguments[0].split(/\r\n|\r|\n/),
    coins = [],
    result = {},
    inputTotal,
    _calculate;

  //入力コインを配列化
  coins = _arguments[0].split(',').sort(function(a, b) {
    return (parseInt(a, 10) < parseInt(b, 10)) ? 1 : -1;
  });
  inputTotal = parseInt(_arguments[1], 10);

  /**
   * 計算のオートマトン
   */
  _calculate = function(currentTotal, currentCoin, coins, currentPaymentCoins) {

    //参照渡しなので配列をコピー
    var _coins = Array.prototype.slice.call(coins);
    var _currentPaymentCoins = Array.prototype.slice.call(currentPaymentCoins);

    //Debug console.log("[" + _coins + "]" + currentTotal + "<-" + currentCoin + "[" + _currentPaymentCoins + "]");

    //前提条件
    // コインが存在する。もしくは、現在の成立している最小コインより少ない。
    if (!currentCoin) {
      return false;
    }
    if (result.coinCount && result.coinCount < _currentPaymentCoins.length) {
      return false;
    }

    /*
     * ここから判定
     */
    if (currentTotal > currentCoin) {

      //継続->同じコインで再実行
      currentTotal -= currentCoin;
      _currentPaymentCoins.push(currentCoin);
      _calculate(currentTotal, currentCoin, _coins, _currentPaymentCoins);

    }
    else if (currentTotal == currentCoin) {

      //受理->次のコインで再実行
      _currentPaymentCoins.push(currentCoin);
      result.coinCount = _currentPaymentCoins.length;
      result.coins = _currentPaymentCoins.sort(function(a, b) {
        return (parseInt(a, 10) > parseInt(b, 10)) ? 1 : -1;
      });

      //Debug console.log('It\'s OK!!' + result.coins);

      _calculate(currentTotal, _coins.shift(), _coins, _currentPaymentCoins);

    }
    else if (currentTotal < currentCoin) {

      //失敗->次のコインで再実行
      _calculate(currentTotal, _coins.shift(), _coins, _currentPaymentCoins);
    }

  };

  /**
   * 公開I/F
   */
  return {
    calculate: function() {

      //coinsのサイズが大きい場合はlengthがオーバーヘッドになるが、サイズは大きくないので良しとする。
      for (var i = 0; i < coins.length; i++) {
        var _coins = Array.prototype.slice.call(coins);
        _calculate(inputTotal, _coins[i], _coins, []);
      }

      //Debug console.log(result.coins.join());
      return result.coins.join();

    }

  };

};


(function() {

  var input = document.getElementById('input'),
    btn = document.getElementById('btn'),
    result = document.getElementById('result');

  btn.onclick = function(e) {
    result.innerText = vending(input.value).calculate();
  };

})();