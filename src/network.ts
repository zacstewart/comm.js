import * as ffi from 'ffi';
import libcomm, { Address, UdpNode } from './index';

class Network {
  private pointer;
  private commands?: NetworkCommands;
  private callbacks = {
    shutdown: []
  };

  private constructor(pointer) {
    this.pointer = pointer;
  }

  static new(selfAddress: Address, host: string, routers: UdpNode[]): Network {
    const pointer = libcomm.comm_network_new(
      selfAddress.consume(), host,
      routers.map((r) => r.consume()), routers.length)
    return new Network(pointer);
  }

  public consume(): any {
    const pointer = this.pointer;
    this.pointer = null;
    return pointer;
  }

  public run() {
    const shutdownCallback = ffi.Callback('void', ['void'], () => {
      this.callbacks.shutdown.forEach(function (callback) {
        callback();
      });
    });
    libcomm.comm_network_register_shutdown_callback(this.pointer, shutdownCallback);

    this.commands = new NetworkCommands(libcomm.comm_network_run(this.consume()));
  }

  public shutdown() {
    return new Promise((resolve, reject) => {
      if (this.commands) {
        this.callbacks.shutdown.push(function () {
          return resolve();
        });
        this.commands.shutdown();
      } else {
        return reject();
      }
    });
  }

  public destroy() {
    libcomm.comm_network_destroy(this.pointer);
    this.pointer = null;
  }

}

class NetworkCommands {
  private pointer;

  constructor(pointer) {
    this.pointer = pointer;
  }

  public shutdown() {
    libcomm.comm_network_commands_shutdown(this.pointer);
  }
}

export default Network;
