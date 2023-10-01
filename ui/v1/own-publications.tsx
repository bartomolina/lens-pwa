import { useOwnPublications } from "@/lib/lens/v1";
import { Publications } from "@/ui/publications";

export function OwnPublications() {
  const { data: ownPublications } = useOwnPublications();

  console.log(ownPublications);

  return (
    <>
      {ownPublications && <Publications publications={ownPublications.items} />}
    </>
  );
}
