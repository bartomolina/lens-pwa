"use client";

import { Navbar, Page } from "konsta/react";
import { useState } from "react";

import { useExplorePublications } from "@/hooks";
import { CreatePost } from "@/ui/create-post";
import { ErrorMessage } from "@/ui/error-message";
import { Navigation } from "@/ui/layout/navigation";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/publications";

export default function ExplorePage() {
  const {
    data: publications,
    refetch,
    isLoading,
    error,
  } = useExplorePublications();
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <Page>
      <Navbar title="Explore" />
      {error instanceof Error && <ErrorMessage message={error.message} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {publications && (
            <Publications
              publications={publications.items}
              setPopupOpened={setPopupOpened}
              popupOpened={popupOpened}
            />
          )}
          <CreatePost
            setPopupOpened={setPopupOpened}
            popupOpened={popupOpened}
            refetch={refetch}
          />
        </>
      )}
      <Navigation activeTab="explore" />
    </Page>
  );
}
