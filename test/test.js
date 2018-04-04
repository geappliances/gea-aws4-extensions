'use strict';

const assert=require('assert'),
  aws=require('aws4'),
  geaAWS=require('../gea-aws4-extensions');

describe('gea-aws4', function() {
  describe('#sign()', function() {
    it('should remove Host header from signing with option "DoNotSignHostHeader"', function () {
      let opts = aws.sign({service: 'foo'}, null, geaAWS.DoNotSignHostHeader);
      assert (! opts.headers.Host);
    });
    it('should not sign Content-Length header with option "DoNotSignContentLength"', function() {
      let opts = aws.sign({
        service: 'foo',
        body: JSON.stringify({foo: 'bar'})
      }, null, geaAWS.DoNotSignContentLength);
      assert (! opts.headers['Content-Length']);
    });
  });
})
