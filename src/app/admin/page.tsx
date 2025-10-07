import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div>Test HomePage</div>
    </HydrateClient>
  );
}
