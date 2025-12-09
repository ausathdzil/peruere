import { Muted, Title } from '@/components/typography';
import { SignInForm } from './(auth)/_components/sign-in-form';

export default function Unauthorized() {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="w-full max-w-xs space-y-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <Title className="text-2xl">401 - Unauthorized</Title>
          <Muted className="text-balance">
            Please sign in to access this page.
          </Muted>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
