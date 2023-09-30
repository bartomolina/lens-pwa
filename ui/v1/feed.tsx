import { useFeed } from "@/lib/lens/v1";
import { Publications } from "@/ui/publications";

export function Feed() {
  const { data: feed } = useFeed();

  const publications = feed?.items.map((item) => item.root);

  return <>{publications && <Publications publications={publications} />}</>;
}
