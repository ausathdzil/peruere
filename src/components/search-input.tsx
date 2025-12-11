'use client';

import { SearchIcon } from 'lucide-react';
import { debounce, useQueryStates } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

import { useMac } from '@/hooks/use-mac';
import { searchParamsParser } from '@/lib/search-params';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd } from './ui/kbd';

export function SearchInput({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [{ q }, setQ] = useQueryStates(searchParamsParser);
  const isMac = useMac();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(
      { q: e.target.value },
      {
        limitUrlUpdates: e.target.value === '' ? undefined : debounce(300),
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQ({ q: e.currentTarget.value });
    }

    if (e.key === 'Escape' && q) {
      setQ(null);
    }
  };

  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        autoCorrect="on"
        className={className}
        name="q"
        onBlur={() => setIsFocused(false)}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        spellCheck="true"
        type="search"
        value={q}
        {...props}
      />
      {!isFocused && !q && (
        <InputGroupAddon align="inline-end">
          <Kbd className="hidden md:flex">
            {isMac ? '⌘' : 'Ctrl'}&nbsp;+&nbsp;K
          </Kbd>
        </InputGroupAddon>
      )}
      {q && (
        <InputGroupAddon align="inline-end">
          <Kbd className="hidden md:flex">Esc</Kbd>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
