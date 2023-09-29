import { BlockTitle, List, ListButton } from "konsta/react";
import { useSignMessage } from "wagmi";
import { useDisconnect } from "wagmi";
import { useSignTypedData } from "wagmi";
import { signMessage, signTypedData } from "@wagmi/core";

export function WalletTest() {
  const { disconnect } = useDisconnect();
  const { signTypedData } = useSignTypedData();

  const domain = {
    name: "Bundlr",
    version: "1",
  };

  const message = {
    address: "0xafb4bbc61f5314efd15843465db6939e1b9c6838",
    "Transaction hash": {
      "0": 23,
      "1": 23,
      "2": 10,
      "3": 16,
      "4": 84,
      "5": 104,
      "6": 40,
      "7": 2,
      "8": 102,
      "9": 42,
      "10": 113,
      "11": 228,
      "12": 39,
      "13": 182,
      "14": 30,
      "15": 211,
      "16": 170,
      "17": 184,
      "18": 135,
      "19": 67,
      "20": 158,
      "21": 163,
      "22": 167,
      "23": 74,
      "24": 187,
      "25": 195,
      "26": 97,
      "27": 138,
      "28": 139,
      "29": 74,
      "30": 83,
      "31": 240,
      "32": 199,
      "33": 30,
      "34": 5,
      "35": 191,
      "36": 224,
      "37": 32,
      "38": 40,
      "39": 26,
      "40": 112,
      "41": 152,
      "42": 116,
      "43": 211,
      "44": 175,
      "45": 204,
      "46": 18,
      "47": 228,
    },
  };

  const types = {
    Bundlr: [
      {
        name: "Transaction hash",
        type: "bytes",
      },
      {
        name: "address",
        type: "address",
      },
    ],
  };

  return (
    <>
      <BlockTitle>Sign</BlockTitle>
      <List strongIos insetIos>
        <ListButton
          onClick={() =>
            signTypedData({
              domain,
              message,
              types,
              // account: bundlr.address as `0x${string}`,
              primaryType: "Bundlr",
            })
          }
        >
          Sign
        </ListButton>
      </List>
      <BlockTitle>Log out</BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => disconnect()}>Disconnect</ListButton>
      </List>
    </>
  );
}
