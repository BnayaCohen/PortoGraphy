"use client";

import React, { ReactNode } from 'react';

type IContentProps = {
  children: ReactNode;
};

const PostContent = (props: IContentProps) => (
  <div className="content">
    {props.children}

    <style jsx>
      {`
        .content :global(*) {
          @apply break-words;
        }

        .content :global(p) {
          @apply my-6 text-white;
        }

        .content :global(ul) {
          @apply my-6;
        }

        .content :global(h1) {
          @apply text-3xl font-semibold text-white my-4;
        }

        .content :global(h2) {
          @apply text-2xl font-semibold text-white my-4;
        }

        .content :global(h3) {
          @apply text-xl font-semibold text-white my-4;
        }
      `}
    </style>
  </div>
);

export { PostContent };
