import { Lead, Text, Title } from '@/components/typography';
import { elysia } from '@/lib/eden';

export default async function Home() {
  const message = await elysia.get();

  return (
    <main className="grid flex-1 p-4">
      <section className="my-16 space-y-4 text-center">
        <Lead>{message.data}</Lead>
        <Text>…</Text>
        <Title className="font-serif">
          A new world to share your thoughts.
        </Title>
      </section>
    </main>
  );
}
