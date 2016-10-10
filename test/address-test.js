const comm = require("../");

exports.testForContent = function (test) {
  let address = comm.Address.forContent('test');
  test.equal(address.toString(), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  address.destroy();
  test.done();
};

exports.testFromString = function (test) {
  let address = comm.Address.fromString('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  test.equal(address.toString(), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  address.destroy();
  test.done();
};

exports.testNull = function (test) {
  let address = comm.Address.null();
  test.equal(address.toString(), '0000000000000000000000000000000000000000');
  address.destroy();
  test.done();
};

exports.testCopy = function (test) {
    let original = comm.Address.fromString('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
    let copy = original.copy();
    original.destroy();
    test.equal(copy.toString(), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
    copy.destroy();
    test.done();
};