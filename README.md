## gea-aws4-extensions

[AWS Signature V4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) is an excellent way to secure web services.  Unfortunately, in the wild, we have come across some non-standard implementations. These seem to be from third parties who have tried to implement the specification but haven't quite hit all the boundary cases correctly.

This module is a monkey patch over the [aws4 javascript module](https://npmjs.com/package/aws4) that adds support for these variations. This module should be 100% interoperable with [aws4](https://npmjs.com/package/aws4) but adds two new *options* that can be passed to the sign method.

This module is not necessary to `require` if you are accessing AWS services directly as those should be covered by the standard [aws4](https://npmjs.com/package/aws4) and you can probably just use that.  Also please note this module doesn't cover securing the credentials you'll need to pass in for the signature.

### Options

- **DoNotSignHostHeader** this is needed for some GEA-internal implementations of HMAC validation that manipulate the
  'Host' header (generally because they are being proxied) - specifically (https://wedeliver.io) has this problem.
- **DoNotSignContentLength** we've encountered an issue when posting data to Home Depot's services (https://hd-apps.com) that is tied to signing of the *content-length* header.  Use this option in the signing process to make sure it doesn't happen.


### Usage

```
const aws=require('aws4'),
const geaAWS=require('gea-aws4-extensions');
...
aws4.sign(options, credentials, geaAWS.DoNotSignHostHeaders);
aws4.sign(options, credentials, geaAWS.DoNotSignContentLength);
```

### History
I did approach the maintainer of [aws4](https://npmjs.com/package/aws4) regarding a potential pull request to support these, but
he was not really inclined to accept them since they really had nothing to do with AWS services.  I maintained a couple different forks for a while.
They were stable for long periods but I found time to combine them into a
single fork and make it interoperable with the AWS4 module finally.  I also added a couple
unit tests and found a way to run the existing unit tests using the monkey patch.
