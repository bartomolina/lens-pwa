import { useLogin, useProfiles } from "@lens-protocol/react-web";
import { BlockTitle, List, ListInput, ListItem, Preloader } from "konsta/react";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useCreateProfile } from "@/hooks";
import { Button, NotificationContext, NotificationType } from "@/ui/common";

interface CreateProfileForm {
  handle: string;
}

interface LoginProps {
  address: string;
}

export function Login({ address }: LoginProps) {
  const notification = useContext(NotificationContext);
  const [loadingProfile, setLoadingProfile] = useState("");
  const { data: profiles } = useProfiles({ where: { ownedBy: [address] } });
  const { execute: login, loading } = useLogin();
  const { mutate: createProfile, isLoading } = useCreateProfile({
    onSuccess: () => {
      notification.show("Profile created");
    },
    onError: (error) => {
      notification.show(
        `Error creating profile: ${error.message}`,
        NotificationType.ERROR
      );
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
      <List strong inset>
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
      {profiles && profiles.length > 0 && (
        <>
          <BlockTitle>
            Profile login
            <div className="text-right text-xs font-light">
              Mumbai - Lens V2
            </div>
          </BlockTitle>
          <List strong inset>
            {profiles.map((profile) => (
              <ListItem
                key={profile.id}
                link
                onClick={() => {
                  if (!loading) {
                    setLoadingProfile(profile.id);
                    login({ address, profileId: profile.id });
                  }
                }}
                header={`${profile.id} (#${Number.parseInt(profile.id, 16)})`}
                title={profile.handle?.fullHandle}
                after={
                  loading && loadingProfile === profile.id ? (
                    <Preloader size="w-5 h-5" />
                  ) : (
                    "Log in"
                  )
                }
              />
            ))}
          </List>
        </>
      )}
    </>
  );
}
