const comm = require("../");

exports.testNew = function (test) {
  let address = comm.Address.forContent('test');
  let node = comm.UdpNode.new(address, '0.0.0.0:6667');
  node.destroy();
  test.done();
};
