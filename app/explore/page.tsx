"use client";

import { Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useExplorePublications } from "@/hooks";
import { ErrorMessage, Loading } from "@/ui/common";
import { CreatePost } from "@/ui/create-post";
import { Navigation } from "@/ui/layout/navigation";
import { Publications } from "@/ui/publications";

export default function ExplorePage() {
  const router = useRouter();
  const { isConnected, isConnecting } = useAccount();
  const {
    data: publications,
    refetch,
    isLoading,
    error,
  } = useExplorePublications();
  const [popupOpened, setPopupOpened] = useState(false);

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [router, isConnecting, isConnected]);

  return (
    <Page>
      {isConnected && (
        <>
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
        </>
      )}
    </Page>
  );
}
