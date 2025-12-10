'use client';

import { NotebookPenIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { createDraft } from '../_lib/actions';

export function CreateArticleButton(
  props: React.ComponentProps<typeof Button>,
) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const { error } = await createDraft();

      if (error) {
        toast.error(error.message, { position: 'top-center' });
        return;
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      size="sm"
      variant="ghost"
      {...props}
    >
      {isPending ? <Spinner /> : <NotebookPenIcon />}
      Write
    </Button>
  );
}
