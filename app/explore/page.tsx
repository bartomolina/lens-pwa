"use client";

import { useExplorePublications } from "@lens-protocol/react-web";
import { Page } from "konsta/react";

import { useLoginRedirect } from "@/hooks";
import { ErrorMessage, Loading } from "@/ui/common";
import { CreatePost } from "@/ui/create-post";
import { NavbarWithDebug, Navigation } from "@/ui/layout";
import { Publications } from "@/ui/publications";

export default function ExplorePage() {
  const { isLoggedIn } = useLoginRedirect();
  const {
    data: publications,
    loading,
    hasMore,
    prev,
    next,
    error,
  } = useExplorePublications();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Explore" />
          {error instanceof Error && <ErrorMessage message={error.message} />}
          {loading ? (
            <Loading />
          ) : (
            <>
              {publications && (
                <Publications
                  publications={publications}
                  hasMore={hasMore}
                  prev={prev}
                  next={next}
                />
              )}
              <CreatePost prev={prev} />
            </>
          )}
          <Navigation activeTab="explore" />
        </>
      )}
    </Page>
  );
}
