// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line import/named
import { appId } from "@lens-protocol/react-web";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PhotoFill } from "framework7-icons/react";
import {
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page,
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

import { PublicationMainFocus } from "@/graphql/v1/generated/graphql";
import { APP_NAME, APP_URL } from "@/lib/constants";
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
}

export function CreatePost({ setPopupOpened }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { data: defaultProfile } = useDefaultProfile();
  const { mutate: createPost } = useCreatePublication({
    onSuccess: () => console.log("post created"),
  });
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  const openFileUpload = () => {
    ref.current.click();
  };

  const onSelectFile = (event_: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event_.target.files?.[0];
    setFile(_file);
    if (_file) {
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
      if (arrayBuffer instanceof ArrayBuffer) {
        const imageURI = await upload(toBuffer(arrayBuffer), file.type);
        createPost({
          ...metadata,
          mainContentFocus: PublicationMainFocus.Image,
          image: `ipfs://${imageURI}`,
          media: [
            {
              item: `ipfs://${imageURI}`,
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
            inputClassName="!h-80 resize-none text-2xl"
          />
          <div className="flex gap-4 p-5">
            <Icon
              ios={
                <PhotoFill
                  className="h-15 w-15 text-primary"
                  onClick={openFileUpload}
                />
              }
            />
            {preview && (
              <Image alt="Upload image" className="h-15" src={preview} />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectFile}
            ref={ref}
          />
          <ListButton type="submit">Post</ListButton>
        </form>
      </List>
    </Page>
  );
}
