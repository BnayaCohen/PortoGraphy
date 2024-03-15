"use client";

import React, { ReactNode } from 'react';

type IContentProps = {
  children: ReactNode;
};

const PostContent = (props: IContentProps) => (
  <div className="post-content">
    {props.children}

    <style jsx>
      {`
        .post-content :global(*) {
          @apply break-words;
        }

        .post-content :global(p) {
          @apply my-6;
        }

        .post-content :global(ul) {
          @apply my-6;
        }

        .post-content :global(h2) {
          @apply text-2xl font-semibold text-gray-700 my-4;
        }

        .post-content :global(h3) {
          @apply text-xl font-semibold text-gray-700 my-4;
        }
      `}
    </style>
  </div>
);

export { PostContent };
