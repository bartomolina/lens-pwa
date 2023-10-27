import { image, MediaImageMimeType, textOnly } from "@lens-protocol/metadata";
import {
  SessionType,
  useCreatePost,
  useSession,
} from "@lens-protocol/react-web";
import { CameraPlus, Plus } from "@phosphor-icons/react";
import {
  Dialog,
  DialogButton,
  Fab,
  Icon,
  List,
  ListInput,
  Page,
  Popup,
} from "konsta/react";
import Image from "next/image";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button, NotificationContext, NotificationType } from "@/ui/common";
import { NavbarWithDebug } from "@/ui/layout";
import { upload as irysUpload } from "@/utils/irys";
import { upload as pinataUpload } from "@/utils/pinata";
import { useLoginRedirect } from "@/hooks";

interface CreatePostProps {
  prev: () => Promise<void>;
}

export function CreatePost({ prev }: CreatePostProps) {
  const { data: session } = useSession();
  const [popupOpened, setPopupOpened] = useState(false);
  const [managerDialog, setManagerDialog] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { execute: createPost, loading, called, error } = useCreatePost();
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const notification = useContext(NotificationContext);
  const { ensureWallet } = useLoginRedirect();
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

    const connectedWallet = await ensureWallet();
    if (!connectedWallet) return;

    if (!loading && !uploadingFiles && (file || content.length > 0)) {
      let metadataURI;
      try {
        setUploadingFiles(true);
        let metadata;
        if (file) {
          const imageURI = await pinataUpload(file);
          metadata = image({
            image: {
              item: imageURI,
              type: file.type as MediaImageMimeType,
            },
            content: content.length > 0 ? content : undefined,
          });
        } else {
          metadata = textOnly({
            content,
          });
        }
        metadataURI = await irysUpload(
          connectedWallet,
          JSON.stringify(metadata)
        );
      } catch (error) {
        console.error("createPost:error:", error);
        notification.show(`Error uploading files`, NotificationType.ERROR);
      } finally {
        setUploadingFiles(false);
      }

      if (metadataURI) {
        try {
          const result = await createPost({ metadata: metadataURI });
          if (result.isFailure()) {
            notification.show(
              `Error posting: ${result.error.message}`,
              NotificationType.ERROR
            );
          } else {
            await result.unwrap().waitForCompletion();
            await prev();
          }
        } catch (error) {
          console.error("createPost:error:", error);
          notification.show(`Error posting`, NotificationType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    if (!loading && called) {
      if (error) {
        notification.show(
          `Error posting: ${error.message}`,
          NotificationType.ERROR
        );
      } else {
        setPopupOpened(false);
        clearForm();
      }
    }
  }, [loading, called, error, notification]);

  return (
    <>
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() =>
          session?.type === SessionType.WithProfile && session.profile.signless
            ? setPopupOpened(true)
            : setManagerDialog(true)
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
          <NavbarWithDebug
            title="New post"
            closeAction={() => setPopupOpened(false)}
          />
          <List strong inset>
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
                isLoading={loading || uploadingFiles}
              />
            </form>
          </List>
        </Page>
      </Popup>
    </>
  );
}
