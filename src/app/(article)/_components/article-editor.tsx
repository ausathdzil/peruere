'use client';

import { FloppyDiskIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useForm } from '@tanstack/react-form';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Placeholder } from '@tiptap/extensions';
import { Markdown } from '@tiptap/markdown';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { useEffect, useRef, useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod/mini';

import type { ArticleModel } from '@/app/elysia/modules/article/model';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { updateArticle } from '../_lib/actions';
import { CodeBlock } from './code-block';
import { Header } from './header';

const articleSchema = z.object({
  title: z
    .string()
    .check(
      z.trim(),
      z.maxLength(255, 'Title must be 255 characters or fewer.'),
    ),
  content: z.string().check(z.trim()),
  excerpt: z
    .string()
    .check(
      z.trim(),
      z.maxLength(255, 'Excerpt must be 255 characters or fewer.'),
    ),
  status: z.literal(
    ['draft', 'published', 'archived'],
    'Status must be either draft, published, or archived.',
  ),
});

export function ArticleEditor({
  article,
}: {
  article: ArticleModel.ArticleResponse;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      title: article.title ?? '',
      content: article.content ?? '',
      excerpt: article.excerpt ?? '',
      status: article.status,
    },
    validators: {
      onSubmit: articleSchema,
    },
    listeners: {
      onChangeDebounceMs: 1000,
      onChange: ({ formApi }) => {
        if (article.status === 'draft') {
          if (formApi.state.isValid) {
            formApi.handleSubmit();
          }
        }
      },
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const res = await updateArticle(article.publicId, {
          title: value.title,
          content: value.content,
          excerpt: value.excerpt,
        });

        if (res?.error) {
          toast.error(res.error.message, { position: 'top-center' });
        }
      });
    },
  });

  return (
    <>
      <Header title={article.title || 'Untitled Draft'} />
      <main className="prose prose-neutral dark:prose-invert mx-auto size-full p-8">
        {isPending && (
          <Button
            className="pointer-events-none fixed right-4 bottom-4 z-20 animate-pulse"
            disabled
            nativeButton={false}
            render={<div />}
            size="lg"
            variant="ghost"
          >
            <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
            Saving…
          </Button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <TitleEditor
                  errors={field.state.meta.errors}
                  isInvalid={isInvalid}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  value={field.state.value}
                />
              );
            }}
            name="title"
            validators={{
              onChange: articleSchema.shape.title,
            }}
          />
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <ExcerptEditor
                  errors={field.state.meta.errors}
                  isInvalid={isInvalid}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  value={field.state.value}
                />
              );
            }}
            name="excerpt"
            validators={{
              onChange: articleSchema.shape.excerpt,
            }}
          />
          <form.Field
            children={(field) => (
              <ContentEditor
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
              />
            )}
            name="content"
          />
        </form>
      </main>
    </>
  );
}

type TitleEditorProps = {
  errors: Array<{ message?: string } | undefined>;
  isInvalid: boolean;
  name: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
};

function TitleEditor({
  errors,
  isInvalid,
  name,
  onBlur,
  onChange,
  value,
}: TitleEditorProps) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) {
      return;
    }

    el.value = value;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="mb-[0.888889em]">
      <textarea
        aria-label={name}
        autoCapitalize="on"
        autoComplete="on"
        autoCorrect="on"
        className="w-full resize-none overflow-hidden font-extrabold text-(--tw-prose-headings) text-4xl leading-[1.11111] focus:outline-none"
        maxLength={255}
        name={name}
        onBlur={onBlur}
        onChange={(e) => {
          onChange(e.currentTarget.value);
          const el = e.currentTarget;
          el.style.height = '0px';
          el.style.height = `${el.scrollHeight}px`;
        }}
        placeholder="Title"
        ref={titleRef}
        rows={1}
        spellCheck="true"
        value={value}
      />
      {isInvalid && <FieldError errors={errors} />}
    </div>
  );
}

type ExcerptEditorProps = {
  errors: Array<{ message?: string } | undefined>;
  isInvalid: boolean;
  name: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
};

function ExcerptEditor({
  errors,
  name,
  value,
  onBlur,
  onChange,
  isInvalid,
}: ExcerptEditorProps) {
  const excerptRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = excerptRef.current;
    if (!el) {
      return;
    }

    el.value = value;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="mb-[0.888889em]">
      <textarea
        aria-label={name}
        className="w-full resize-none overflow-hidden font-semibold text-2xl focus:outline-none"
        maxLength={255}
        name={name}
        onBlur={onBlur}
        onChange={(e) => {
          onChange(e.currentTarget.value);
          const el = e.currentTarget;
          el.style.height = '0px';
          el.style.height = `${el.scrollHeight}px`;
        }}
        placeholder="Excerpt"
        ref={excerptRef}
        rows={1}
        spellCheck="true"
        value={value}
      />
      {isInvalid && <FieldError errors={errors} />}
    </div>
  );
}

const lowlight = createLowlight(common);

type ContentEditorProps = {
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
};

function ContentEditor({ value, onBlur, onChange }: ContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({
        enableTabIndentation: true,
        lowlight,
        tabSize: 2,
      }),
      Markdown.configure({
        markedOptions: {
          gfm: true,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level}`;
          }

          if (node.type.name === 'blockquote') {
            return 'Quote';
          }

          if (
            node.type.name === 'bulletList' ||
            node.type.name === 'orderedList'
          ) {
            return 'List';
          }

          return 'Start writing…';
        },
      }),
    ],
    content: value,
    contentType: 'markdown',
    editorProps: {
      attributes: {
        'aria-label': 'content',
        class: 'focus:outline-none',
      },
    },
    onBlur,
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown();
      onChange(markdown);
    },
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
