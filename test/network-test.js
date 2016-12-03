const comm = require("../");

exports.testNew = function (test) {
  const selfAddress = comm.Address.forContent('test');
  const host = '0.0.0.0:6667';
  const routers = [comm.UdpNode.new(selfAddress.copy(), '0.0.0.0:6667')];
  const network = comm.Network.new(selfAddress, host, routers);
  network.destroy();
  test.done();
};

exports.testRun = function (test) {
  test.expect(1);
  const selfAddress = comm.Address.forContent('test');
  const host = '0.0.0.0:6667';
  const routers = [comm.UdpNode.new(selfAddress.copy(), '0.0.0.0:6667')];
  const network = comm.Network.new(selfAddress, host, routers);
  network.run();
  network.shutdown().then(function () {
    test.ok(true);
    test.done();
  }).catch(function () {
    test.ok(false);
    test.done();
  });
};
