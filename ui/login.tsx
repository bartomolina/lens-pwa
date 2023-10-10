import {
  BlockTitle,
  List,
  ListButton,
  ListInput,
  ListItem,
  Preloader,
} from "konsta/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCreateProfile, useLogin, useProfiles } from "@/hooks";

export function Login() {
  const router = useRouter();
  const [newProfile, setNewProfile] = useState({ handle: "", changed: false });
  const { data: profiles, refetch } = useProfiles();
  const { mutate: login } = useLogin({
    onSuccess: () => router.push("/explore"),
  });
  const { mutate: createProfile, isLoading } = useCreateProfile({
    onSuccess: () => {
      alert("profile created");
      refetch();
    },
  });

  const handleNewProfileChange = (
    event_: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProfile({ handle: event_.target.value, changed: true });
  };

  return (
    <>
      <BlockTitle>
        Create profile with handle
        <div className="text-right text-xs font-light">Mumbai - Lens V2</div>
      </BlockTitle>
      <List strongIos insetIos>
        <ListInput
          label="Handle"
          type="text"
          placeholder="letsraave"
          info="Lowercase, numbers, -, _. 5 to 31 characters"
          value={newProfile.handle}
          error={
            newProfile.changed && !newProfile.handle.trim()
              ? "Lowercase, numbers, -, _. 5 to 31 characters"
              : ""
          }
          onChange={handleNewProfileChange}
        />
        <ListButton onClick={() => createProfile(newProfile.handle)}>
          {isLoading && <Preloader size="w-10 h-10 p-2" />}
          <span>{isLoading ? "Creating profile" : "Create profile"}</span>
        </ListButton>
      </List>
      <BlockTitle>
        Profile login
        <div className="text-right text-xs font-light">Mumbai - Lens V2</div>
      </BlockTitle>
      <List strongIos insetIos>
        {profiles?.items.map((profile) => (
          <ListItem
            key={profile.id}
            link
            onClick={() => login(profile.id)}
            header={`${profile.id} (#${Number.parseInt(profile.id, 16)})`}
            title={profile.handle}
            after="Log in"
          />
        ))}
      </List>
    </>
  );
}
