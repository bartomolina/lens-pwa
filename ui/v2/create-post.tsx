// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line import/named
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { textOnly } from "@lens-protocol/metadata";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Photo, Plus } from "framework7-icons/react";
import {
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page,
  Popup,
  Preloader,
} from "konsta/react";
import Image from "next/image";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

// import { useAccount } from "wagmi";
import { Query } from "@/graphql/v2/generated/graphql";
import { useCreatePublication } from "@/lib/lens/v2";

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
  popupOpened: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<Query>>;
}

export function CreatePost({
  setPopupOpened,
  popupOpened,
  refetch,
}: CreatePostProps) {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string>();
  const { mutate: createPost, isLoading } = useCreatePublication({
    onSuccess: async () => {
      await refetch();
      console.log("create post: post created");
      setPopupOpened(false);
    },
  });
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  const clearForm = () => {
    setContent("");
    setPreview("");
  };

  const openFileUpload = () => {
    ref.current.click();
  };

  const onSelectFile = async (event_: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event_.target.files?.[0];
    if (_file) {
      const objectUrl = URL.createObjectURL(_file);
      setPreview(objectUrl);
    }
  };

  const handleCreatePost = async (event_: React.FormEvent<HTMLFormElement>) => {
    event_.preventDefault();

    const metadata = textOnly({
      content,
    });

    createPost(metadata);
    clearForm();
  };

  return (
    <>
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() => setPopupOpened(true)}
      />
      <Popup opened={popupOpened} onBackdropClick={() => setPopupOpened(false)}>
        <Page>
          <Navbar
            title="New post"
            right={
              <Link navbar onClick={() => setPopupOpened(false)}>
                Close
              </Link>
            }
          />
          <List strongIos insetIos>
            <form onSubmit={handleCreatePost}>
              <ListInput
                label="Content"
                type="textarea"
                value={content}
                onChange={(event_) => setContent(event_.target.value)}
                placeholder="What's happening?"
                inputClassName="!h-80 resize-none !text-2xl"
              />
              <div className="flex gap-4 p-5">
                <Icon
                  ios={
                    <Photo
                      className="h-10 w-10 text-primary"
                      onClick={openFileUpload}
                    />
                  }
                />
                {preview && (
                  <div className="relative h-10 w-10">
                    <Image alt="Upload image" src={preview} fill />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelectFile}
                ref={ref}
              />
              <ListButton type="submit" className="flex gap-2">
                {isLoading && <Preloader size="w-10 h-10 p-2" />}
                <span>{isLoading ? "Posting" : "Post"}</span>
              </ListButton>
            </form>
          </List>
        </Page>
      </Popup>
    </>
  );
}
