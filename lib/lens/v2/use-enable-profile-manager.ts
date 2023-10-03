import { useMutation } from "@tanstack/react-query";
import { signTypedData, writeContract } from "@wagmi/core";
import { utils } from "ethers";
import { useAccount } from "wagmi";

import { CreateChangeProfileManagersTypedDataDocument } from "@/graphql/v2/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";
import { lensHubInfo } from "@/lib/lens-hub";
import { omit } from "@/utils/omit";

interface EnableProfileManagerOptions {
  onSuccess?: () => void;
}

export const useEnableProfileManager = ({
  onSuccess,
}: EnableProfileManagerOptions) => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: async () => {
      const result = await apolloClient.query({
        query: CreateChangeProfileManagersTypedDataDocument,
        variables: {
          request: {
            approveLensManager: true,
          },
        },
      });

      const typedData =
        result.data.createChangeProfileManagersTypedData.typedData;

      const signature = await signTypedData({
        domain: omit(typedData.domain, "__typename"),
        message: omit(typedData.value, "__typename"),
        types: omit(typedData.types, "__typename"),
        primaryType: "ChangeDelegatedExecutorsConfig",
      });

      console.log("use enable profile manager: enabling profile manager");

      const { v, r, s } = utils.splitSignature(signature);

      const tx = await writeContract({
        address: lensHubInfo.address,
        abi: lensHubInfo.abi,
        functionName: "changeDelegatedExecutorsConfigWithSig",
        args: [
          typedData.value.delegatorProfileId,
          typedData.value.delegatedExecutors,
          typedData.value.approvals,
          typedData.value.configNumber,
          typedData.value.switchToGivenConfig,
          {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        ],
      });

      console.log("use enable profile manager:", tx);
    },
    onSuccess,
  });
};
