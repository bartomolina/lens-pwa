import { BlockTitle, List, ListInput, ListItem, Preloader } from "konsta/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useCreateProfile, useLogin, useProfiles } from "@/hooks";
import { Button, NotificationContext } from "@/ui/common";

interface CreateProfileForm {
  handle: string;
}

export function Login() {
  const router = useRouter();
  const notification = useContext(NotificationContext);
  const [loadingProfile, setLoadingProfile] = useState("");
  const { data: profiles, refetch } = useProfiles();
  const { mutate: login } = useLogin({
    onSuccess: () => router.push("/explore"),
    onError: () => {
      setLoadingProfile("");
    },
  });
  const { mutate: createProfile, isLoading } = useCreateProfile({
    onSuccess: () => {
      notification.show("Profile created");
      refetch();
    },
    onError: (error) => {
      notification.show(`Error creating profile: ${error.message}`);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfileForm>();

  const handleCreateProfile: SubmitHandler<CreateProfileForm> = (data) =>
    createProfile(data.handle);

  return (
    <>
      <BlockTitle>
        Create profile with handle
        <div className="text-right text-xs font-light">Mumbai - Lens V2</div>
      </BlockTitle>
      <List strongIos insetIos>
        <form onSubmit={handleSubmit(handleCreateProfile)}>
          <Controller
            control={control}
            defaultValue=""
            rules={{
              pattern: /^[\d_a-z-]{5,31}$/,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ListInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                label="Handle"
                type="text"
                placeholder="letsraave"
                info="Lowercase, numbers, -, _. 5 to 31 characters"
                error={
                  errors.handle &&
                  "Lowercase, numbers, -, _. 5 to 31 characters"
                }
              />
            )}
            name="handle"
          />
          <Button
            text="Create profile"
            textLoading="Creating profile"
            type="submit"
            isLoading={isLoading}
          />
        </form>
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
            onClick={() => {
              setLoadingProfile(profile.id);
              login(profile.id);
            }}
            header={`${profile.id} (#${Number.parseInt(profile.id, 16)})`}
            title={profile.handle}
            after={
              loadingProfile === profile.id ? (
                <Preloader size="w-7 h-7" />
              ) : (
                "Log in"
              )
            }
          />
        ))}
      </List>
    </>
  );
}
