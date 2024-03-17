import { notFound } from "next/navigation";
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPostBySlug } from "../../util/Content";
import { markdownToHtml } from '../../util/Markdown';

// import { Mdx } from "@/app/components/mdx";
import { PostContent } from '../../components/postContent';
import { Header } from "./header";
import "./mdx.css";
// import { ReportView } from "./view";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

// type IPostUrl = {
//   slug: string;
// };

// type IPostProps = {
//   title: string;
//   description: string;
//   date: string;
//   modified_date: string;
//   image: string;
//   content: string;
// };

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const post = getAllPosts(['title', 'description', 'date', 'slug', 'image', 'content'])
    .find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }
  else {
    post.content = await markdownToHtml(post.content || '');
  }

  const views = 1665

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header post={post} views={views} />
      {/* <ReportView slug={post.slug} /> */}

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        {/* <Mdx code={post.body.code} /> */}
        <PostContent>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </PostContent>
      </article>
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
//   const posts = getAllPosts(['slug']);

//   return {
//     paths: posts.map((post) => ({
//       params: {
//         slug: post.slug,
//       },
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
//   params,
// }) => {
//   const post = getPostBySlug(params!.slug, [
//     'title',
//     'description',
//     'date',
//     'modified_date',
//     // 'image',
//     'content',
//     'slug',
//   ]);
//   const content = await markdownToHtml(post.content || '');

//   return {
//     props: {
//       title: post.title,
//       description: post.description,
//       date: post.date,
//       modified_date: post.modified_date,
//       // image: post.image,
//       content,
//     },
//   };
// };
