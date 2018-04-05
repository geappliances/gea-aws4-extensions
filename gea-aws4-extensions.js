'use strict';
const aws4=require('aws4');

let aws4prepareRequest = aws4.RequestSigner.prototype.prepareRequest;
aws4.RequestSigner.prototype.signeroptions=[];

let aws4Sign = aws4.sign;
aws4.sign = function sign (request, credentials, ...options) {
  let signer = new aws4.RequestSigner(request,credentials);
  signer.signeroptions=options;
  if (options.includes(module.exports.DoNotSignHostHeader)) {
    delete signer.request.headers.Host;
  }
  return signer.sign();
}
aws4.RequestSigner.prototype.prepareRequest = function prepareRequest() {
  aws4prepareRequest.apply(this);
  if (this.signeroptions.includes(module.exports.DoNotSignContentLength)
        && this.request && this.request.headers) {
          delete this.request.headers['Content-Length'];
  }
}

module.exports = {
  DoNotSignHostHeader: ()=>{},
  DoNotSignContentLength: ()=> {}
}
