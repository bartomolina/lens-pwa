import { LENS_HUB } from "@/lib/constants";

export const lensHubInfo = {
  address: LENS_HUB,
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "delegatorProfileId",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "delegatedExecutors",
          type: "address[]",
        },
        {
          internalType: "bool[]",
          name: "approvals",
          type: "bool[]",
        },
        {
          internalType: "uint64",
          name: "configNumber",
          type: "uint64",
        },
        {
          internalType: "bool",
          name: "switchToGivenConfig",
          type: "bool",
        },
        {
          components: [
            {
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "v",
              type: "uint8",
            },
            {
              internalType: "bytes32",
              name: "r",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "s",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          internalType: "struct Types.EIP712Signature",
          name: "signature",
          type: "tuple",
        },
      ],
      name: "changeDelegatedExecutorsConfigWithSig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
