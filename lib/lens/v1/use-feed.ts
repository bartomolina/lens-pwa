import { useQuery } from "@tanstack/react-query";

import { getFeed } from "./get-feed";
import { useDefaultProfile } from "./use-default-profile";

export const useFeed = () => {
  const { data: defaultProfile } = useDefaultProfile();

  return useQuery({
    enabled: defaultProfile?.id != undefined,
    queryKey: ["feed", defaultProfile?.id],
    queryFn: async () => {
      let result;
      if (defaultProfile) {
        result = await getFeed({ profileId: defaultProfile?.id });
        console.log("use feed:", result);
      }

      return result;
    },
  });
};
