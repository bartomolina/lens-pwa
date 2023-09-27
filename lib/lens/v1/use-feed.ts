import { useQuery } from "@tanstack/react-query";

import { getFeed } from "./get-feed";
import { useDefaultProfile } from "./use-default-profile";

export const useFeed = () => {
  const { data: defaultProfile } = useDefaultProfile();

  return useQuery({
    queryKey: ["feed", defaultProfile?.id],
    queryFn: async () => {
      console.log("use feed: getting feed");
      console.log("use feed: userid", defaultProfile?.id);
      let result;
      if (defaultProfile) {
        result = await getFeed({ profileId: defaultProfile?.id });
        console.log("use feed:", result);
      }

      return result;
    },
  });
};
