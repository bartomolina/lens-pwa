// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line import/named
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line import/named
import { appId } from "@lens-protocol/react-web";
import Compressor from "compressorjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Photo } from "framework7-icons/react";
import {
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page,
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; // eslint-disable-line import/no-unresolved
import { useAccount } from "wagmi";

import { PublicationMainFocus, Query } from "@/graphql/v1/generated/graphql";
import { APP_NAME, APP_URL, ARWEAVE_GATEWAY } from "@/lib/constants";
import { useCreatePublication, useDefaultProfile } from "@/lib/lens/v1";
import { upload } from "@/utils/bundlr";

function toBuffer(arrayBuffer: ArrayBuffer) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<Query>>;
}

export function CreatePost({ setPopupOpened, refetch }: CreatePostProps) {
  const { address } = useAccount();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { data: defaultProfile } = useDefaultProfile();
  const { mutate: createPost, isLoading } = useCreatePublication({
    onSuccess: async () => {
      await refetch();
      console.log("create post: post created");
      setPopupOpened(false);
    },
  });
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  const openFileUpload = () => {
    ref.current.click();
  };

  const onSelectFile = async (event_: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event_.target.files?.[0];
    if (_file) {
      new Compressor(_file, {
        quality: 0,
        success(result: File) {
          console.log(result);
          setFile(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
      const objectUrl = URL.createObjectURL(_file);
      setPreview(objectUrl);
    }
  };

  const handleCreatePost = async (event_: React.FormEvent<HTMLFormElement>) => {
    event_.preventDefault();

    const metadata = {
      version: "2.0.0",
      metadata_id: uuidv4(),
      name: `Post by @${defaultProfile?.handle}}`,
      description: content,
      content,
      locale: "en-US",
      external_url: APP_URL,
      attributes: [],
      appId: appId(APP_NAME),
    };

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      if (address && arrayBuffer instanceof ArrayBuffer) {
        const image = await upload(address, toBuffer(arrayBuffer), file.type);
        const imageURI = image ? `${ARWEAVE_GATEWAY}${image.id}` : "";
        await createPost({
          ...metadata,
          mainContentFocus: PublicationMainFocus.Image,
          image: imageURI,
          media: [
            {
              item: imageURI,
              type: file.type,
            },
          ],
        });
      }
    } else {
      createPost({
        ...metadata,
        mainContentFocus: PublicationMainFocus.TextOnly,
      });
    }
  };

  return (
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
          {isLoading ? (
            <div className="flex">
              <Preloader size="w-10 h-10 p-2" className="mx-auto" />
            </div>
          ) : (
            <ListButton type="submit">Post</ListButton>
          )}
        </form>
      </List>
    </Page>
  );
}
