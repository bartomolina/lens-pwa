import { AnyPublicationFragment, PaginatedResult } from "@lens-protocol/client";
import { CameraPlus, Plus } from "@phosphor-icons/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import {
  Dialog,
  DialogButton,
  Fab,
  Icon,
  Link,
  List,
  ListInput,
  Navbar,
  Page,
  Popup,
} from "konsta/react";
import Image from "next/image";
import { MutableRefObject, useRef, useState } from "react";

import { useProfile } from "@/hooks";
import { useCreatePublication } from "@/hooks/use-create-publication";

import { Button } from "./common";

interface CreatePostProps {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<PaginatedResult<AnyPublicationFragment>, unknown>
  >;
}

export function CreatePost({ refetch }: CreatePostProps) {
  const { data: profile } = useProfile();
  const [popupOpened, setPopupOpened] = useState(false);
  const [managerDialog, setManagerDialog] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { mutate: createPost, isLoading } = useCreatePublication({
    onSuccess: async () => {
      console.log("create post: post created");
      await refetch();
      setPopupOpened(false);
      clearForm();
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

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files?.[0];
    if (_file) {
      setFile(_file);
      const objectUrl = URL.createObjectURL(_file);
      setPreview(objectUrl);
      e.target.value = "";
    }
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoading && (file || content.length > 0)) {
      createPost({ content, file });
    }
  };

  return (
    <>
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() =>
          profile?.lensManager ? setPopupOpened(true) : setManagerDialog(true)
        }
      />
      <Dialog
        opened={managerDialog}
        onBackdropClick={() => setManagerDialog(false)}
        title="Manager is disabled"
        content="Before posting, you need to enable the Profile Manager in Settings"
        buttons={
          <DialogButton onClick={() => setManagerDialog(false)}>
            Ok
          </DialogButton>
        }
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
                type="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                inputClassName="!h-80 resize-none !text-2xl"
              />
              <div className="flex gap-4 p-5">
                <Icon
                  ios={
                    <CameraPlus
                      size={40}
                      className="text-primary"
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
              <Button
                text="Post"
                textLoading="Posting"
                type="submit"
                isLoading={isLoading}
              />
            </form>
          </List>
        </Page>
      </Popup>
    </>
  );
}
