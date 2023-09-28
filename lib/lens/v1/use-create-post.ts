import { useMutation } from "@tanstack/react-query";

import { createPost } from "./create-post";
import { useDefaultProfile } from "./use-default-profile";

interface CreatePostOptions {
  onSuccess?: () => void;
}

export const useCreatePost = ({ onSuccess }: CreatePostOptions) => {
  const { data: defaultProfile } = useDefaultProfile();

  return useMutation({
    mutationFn: async (contentURI: string) => {
      if (defaultProfile) {
        console.log("use create post:", contentURI);

        // create post
        const createProfileresponse = await createPost({
          from: defaultProfile.id,
          contentURI,
        });

        console.log("use create post:", createProfileresponse);
      }
    },
    onSuccess,
  });
};
