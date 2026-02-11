import {
  Archive03Icon,
  Delete01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function EditorActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Actions"
        render={<Button size="icon" variant="ghost" />}
        title="Actions"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem disabled>
          Archive
          <HugeiconsIcon
            className="ml-auto"
            icon={Archive03Icon}
            strokeWidth={2}
          />
        </DropdownMenuItem>
        <DropdownMenuItem disabled variant="destructive">
          Delete
          <HugeiconsIcon
            className="ml-auto"
            icon={Delete01Icon}
            strokeWidth={2}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
