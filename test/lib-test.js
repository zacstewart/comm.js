const ffi = require('ffi');
const lib = require("../");
const comm = lib.libcomm;

exports.testAddressForContent = function (test) {
  const ptr = comm.comm_address_for_content('test');
  test.equal(comm.comm_address_to_str(ptr), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  test.done();
};

exports.testAddressFromString = function (test) {
  const ptr = comm.comm_address_from_str('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  test.equal(comm.comm_address_to_str(ptr), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  comm.comm_address_destroy(ptr);
  test.done();
};

exports.testAddressNull = function (test) {
  const ptr = comm.comm_address_null();
  test.equal(comm.comm_address_to_str(ptr), '0000000000000000000000000000000000000000');
  comm.comm_address_destroy(ptr);
  test.done();
};

exports.testAddressCopy = function (test) {
  const original = comm.comm_address_from_str('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  const copy = comm.comm_address_copy(original);
  comm.comm_address_destroy(original);
  test.equal(comm.comm_address_to_str(copy), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  comm.comm_address_destroy(copy);
  test.done();
};

exports.testUdpNodeNew = function (test) {
  const address = comm.comm_address_for_content('test');
  const ptr = comm.comm_udp_node_new(address, 'localhost:6667');
  comm.comm_udp_node_destroy(ptr);
  test.done();
};

exports.testNetworkNew = function (test) {
  const routerAddress = comm.comm_address_for_content('alpha');
  const router = comm.comm_udp_node_new(routerAddress, '127.0.0.1:6667');
  const routers = lib.comm_udp_node_ptr_array([router]);
  const address = comm.comm_address_for_content('beta');
  const network = comm.comm_network_new(address, "127.0.0.1:6668", routers, 1);
  comm.comm_network_destroy(network);
  return test.done();
};
