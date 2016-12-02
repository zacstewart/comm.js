import * as ref from 'ref';
import * as ffi from 'ffi';
import * as ArrayType from 'ref-array';

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

class Address {
  private pointer;

  constructor(pointer) {
    this.pointer = pointer;
  }

  static forContent(content: string): Address {
    const pointer = libcomm.comm_address_for_content(content);
    return new Address(pointer);
  }

  static fromString(string: string): Address {
    const pointer = libcomm.comm_address_from_str(string);
    return new Address(pointer);
  }

  static null(): Address {
    return new Address(libcomm.comm_address_null());
  }

  public copy(): Address {
    return new Address(libcomm.comm_address_copy(this.pointer));
  }
  public destroy(): void {
    libcomm.comm_address_destroy(this.pointer);
    this.pointer = null;
  }

  public toString(): string {
    return libcomm.comm_address_to_str(this.pointer);
  }
}

libcomm.comm_initialize();
export { 
  libcomm,
  comm_udp_node_ptr_array,
  Address
};
