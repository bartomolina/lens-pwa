"use client";

import { Navbar, Page } from "konsta/react";

import { useExplorePublications, useLoginRedirect } from "@/hooks";
import { ErrorMessage, Loading } from "@/ui/common";
import { CreatePost } from "@/ui/create-post";
import { Navigation } from "@/ui/layout/navigation";
import { Publications } from "@/ui/publications";

export default function ExplorePage() {
  const { isLoggedIn } = useLoginRedirect();
  const {
    data: publications,
    refetch,
    isInitialLoading,
    error,
  } = useExplorePublications();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <Navbar title="Explore" />
          {error instanceof Error && <ErrorMessage message={error.message} />}
          {isInitialLoading ? (
            <Loading />
          ) : (
            <>
              {publications && (
                <Publications publications={publications.items} />
              )}
              <CreatePost refetch={refetch} />
            </>
          )}
          <Navigation activeTab="explore" />
        </>
      )}
    </Page>
  );
}
