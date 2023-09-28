// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Plus } from "framework7-icons/react";
import {
  Card,
  Fab,
  Link,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page,
  Popup,
} from "konsta/react";
import { useState } from "react";

import { useCreatePost,useFeed } from "@/lib/lens/v1";

export function Feed() {
  const [popupOpened, setPopupOpened] = useState(false);
  const { data: feed } = useFeed();
  const { mutate: createPost } = useCreatePost({
    onSuccess: () => alert("post created"),
  });

  return (
    <div className="mb-28">
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() => setPopupOpened(true)}
      />
      {feed?.items.map((publication) => (
        <Card key={publication.root.id} outline>
          {publication.root.metadata.media &&
            publication.root.metadata.media[0] && (
              <div
                className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
                style={{
                  backgroundImage: `url(${publication.root.metadata.media[0].original.url})`,
                }}
              />
            )}
          <div>
            <div className="font-semibold">
              {publication.root.profile.handle}
            </div>
            <div className="mb-3 text-gray-500">Posted on January 21, 2021</div>
          </div>
          <p>{publication.root.metadata.content}</p>
        </Card>
      ))}
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
            <ListInput
              label="Content"
              type="textarea"
              placeholder="What's happening?"
              inputClassName="!h-80 resize-none"
            />
            <ListButton
              onClick={() =>
                createPost("ar://Xu37cbQd-fBiY8cykrp3-ShKNlk-AJqhkaoRL2F3n-w")
              }
            >
              Post
            </ListButton>
          </List>
        </Page>
      </Popup>
    </div>
  );
}
