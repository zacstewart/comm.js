import libcomm, { Address } from './index';

class UdpNode {
  private pointer;

  private constructor(pointer) {
    this.pointer = pointer;
  }

  static new(address: Address, socketAddress: string): UdpNode {
    const pointer = libcomm.comm_udp_node_new(
      address.consume(), socketAddress);
    return new UdpNode(pointer);
  }

  public consume(): any {
    const pointer = this.pointer;
    this.pointer = null
    return pointer;
  }

  public destroy(): void {
    libcomm.comm_udp_node_destroy(this.pointer);
    this.pointer = null;
  }
}

export default UdpNode;
