describe('Tests Regex', function() {

  var matcher, urlReplace = {}, list = {};

  beforeEach(function() {
    //あえて外出し
    matcher = new RegExp(/{([\s\S]+?)}/g);

    /**
     * {aa}/{bb}/このようなURLのリンクを引数Objectのプロパティに一致するもので補完する機能
     */
    urlReplace = function(url, list) {
      var propName;
      return url.replace(matcher, function(match) {
        propName = match.replace(/[{}]/g, '');
        return list[propName] ? list[propName] : match;
      });
    };
  });

  /**
   * 基本的なreplaceのテスト
   */
  it('Tests basic matcher', function() {

    expect(''.replace(matcher, 'hit')).toBe('');
    expect('/aaa'.replace(matcher, 'hit')).toBe('/aaa');
    expect('aaa/'.replace(matcher, 'hit')).toBe('aaa/');
    expect('/{'.replace(matcher, 'hit')).toBe('/{');
    expect('}/'.replace(matcher, 'hit')).toBe('}/');
    expect('/{aaa'.replace(matcher, 'hit')).toBe('/{aaa');
    expect('aaa}/'.replace(matcher, 'hit')).toBe('aaa}/');
    expect('/{}/'.replace(matcher, 'hit')).toBe('/{}/');
    expect('/{aaa}'.replace(matcher, 'hit')).toBe('/hit');
    expect('{aaa}/'.replace(matcher, 'hit')).toBe('hit/');
    expect('/{aaa}/'.replace(matcher, 'hit')).toBe('/hit/');
    expect('/{aaa}/{aaa}'.replace(matcher, 'hit')).toBe('/hit/hit');
    expect('/{aaa}/{aaa}/'.replace(matcher, 'hit')).toBe('/hit/hit/');
    expect('{aaa}/{aaa}'.replace(matcher, 'hit')).toBe('hit/hit');
    expect('{aaa}/{aaa}/'.replace(matcher, 'hit')).toBe('hit/hit/');
  });

  /**
   * リンクテキストreplaceのテスト
   */
  describe('Tests url replace', function() {
    beforeEach(function() {
      list = {};
    });

    it('none url parameters', function() {
      expect(urlReplace('{aaa}/{bbb}', list)).toBe('{aaa}/{bbb}');

      list.hoge = 'hoge';
      expect(urlReplace('{aaa}/{bbb}', list)).toBe('{aaa}/{bbb}');
    });

    it('one url parameters', function() {
      list.aaa = 'hoge';
      expect(urlReplace('{aaa}/{bbb}', list)).toBe('hoge/{bbb}');

      delete list.aaa;
      list.bbb = 'fuga';
      expect(urlReplace('{aaa}/{bbb}', list)).toBe('{aaa}/fuga');
    });

    it('two url parameters', function() {
      list.aaa = 'hoge';
      list.bbb = 'fuga'
      expect(urlReplace('{aaa}/{bbb}', list)).toBe('hoge/fuga');
    });
  });
});
