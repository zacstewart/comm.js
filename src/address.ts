import libcomm from './index';

class Address {
  private pointer;

  private constructor(pointer) {
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

  public consume(): any {
    const pointer = this.pointer;
    this.pointer = null
    return pointer;
  }

  public destroy(): void {
    libcomm.comm_address_destroy(this.pointer);
    this.pointer = null;
  }

  public toString(): string {
    return libcomm.comm_address_to_str(this.pointer);
  }
}

export default Address;
