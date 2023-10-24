import { IBindings } from "@lens-protocol/react-web";
import { providers } from "ethers";

class PrivyBindings implements IBindings {
  private signer: providers.JsonRpcSigner | undefined = undefined;
  private provider: providers.JsonRpcProvider | undefined = undefined;
  set: boolean = false;

  async getProvider() {
    if (this.provider === undefined) {
      throw new Error("Provider is not set");
    }
    return this.provider;
  }

  async getSigner() {
    if (this.signer === undefined) {
      throw new Error("Signer is not set");
    }
    return this.signer;
  }

  update({
    signer,
    provider,
  }: {
    signer: providers.JsonRpcSigner;
    provider: providers.JsonRpcProvider;
  }) {
    this.signer = signer;
    this.provider = provider;
    this.set = true;
  }
}

export const bindings = new PrivyBindings();
