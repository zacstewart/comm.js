import * as ref from 'ref';
import * as ffi from 'ffi';

var libcomm = ffi.Library('lib/c_api/target/debug/libcomm', {
  'comm_initialize': ['void', []],
  'comm_address_for_content': ['pointer', ['string']],
  'comm_address_from_str': ['pointer', ['string']],
  'comm_address_null': ['pointer', []],
  'comm_address_copy': ['pointer', ['pointer']],
  'comm_address_to_str': ['string', ['pointer']],
  'comm_address_destroy': ['void', ['pointer']],
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
export { libcomm, Address };
