'use client';

import { SearchIcon } from 'lucide-react';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd } from './ui/kbd';

export function SearchInput({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ shallow: false }),
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value, {
      limitUrlUpdates: e.target.value === '' ? undefined : debounce(300),
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQ(e.currentTarget.value);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }

      if (e.key === 'esc') {
        e.preventDefault();
        setQ(null);
      }
    };

    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [setQ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/Mac/.test(window.navigator.userAgent));
    }
  }, []);

  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        autoCapitalize="off"
        autoComplete="off"
        className={className}
        onBlur={() => setIsFocused(false)}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleEnter}
        ref={inputRef}
        spellCheck="false"
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
