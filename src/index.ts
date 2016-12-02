import * as ref from 'ref';
import * as ffi from 'ffi';
import * as ArrayType from 'ref-array';
import Address from './address';
import UdpNode from './udp-node';

const comm_udp_node_ptr = ref.refType(ref.types.void);
const comm_udp_node_ptr_array = ArrayType(comm_udp_node_ptr);

const libcomm = ffi.Library('lib/c_api/target/debug/libcomm', {
  'comm_initialize': ['void', []],

  'comm_address_for_content': ['pointer', ['string']],
  'comm_address_from_str': ['pointer', ['string']],
  'comm_address_null': ['pointer', []],
  'comm_address_copy': ['pointer', ['pointer']],
  'comm_address_to_str': ['string', ['pointer']],
  'comm_address_destroy': ['void', ['pointer']],

  'comm_udp_node_new': [comm_udp_node_ptr, ['pointer', 'string']],
  'comm_udp_node_destroy': ['void', [comm_udp_node_ptr]],

  'comm_network_new': ['pointer', [
    'pointer',
    'string',
    comm_udp_node_ptr_array,
    ref.types.size_t
  ]],
  'comm_network_run': ['pointer', ['pointer']],
  'comm_network_destroy': ['void', ['pointer']],
  'comm_network_register_shutdown_callback': ['void', ['pointer', 'pointer']],

  'comm_network_commands_shutdown': ['void', ['pointer']],

  'comm_client_new': ['pointer', ['pointer']],
  'comm_client_run': ['pointer', ['pointer', 'pointer']],
  'comm_client_destroy': ['void', ['pointer']],
  'comm_client_register_shutdown_callback': ['void', ['pointer', 'pointer']],

  'comm_client_commands_shutdown': ['void', ['pointer']],
});

libcomm.comm_initialize();

export default libcomm;
export {
  comm_udp_node_ptr_array,
  Address,
  UdpNode
};
