import { Profile } from "@/graphql/v1/generated/graphql";
import { useDefaultProfile, useOwnPublications } from "@/lib/lens/v1";
import { Publications } from "@/ui/publications";

export function OwnPublications() {
  const { data: defaultProfile } = useDefaultProfile();
  const { data: ownPublications } = useOwnPublications();

  return (
    <>
      {ownPublications && <Publications publications={ownPublications.items} />}
    </>
  );
}
