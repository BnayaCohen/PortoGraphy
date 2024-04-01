import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../util/Content";
import { markdownToHtml } from '../../util/Markdown';

// import { Mdx } from "@/app/components/mdx";
// import "./mdx.css";
// import { ReportView } from "./view";
import { PostContent } from '../../components/postContent';
import { Header } from "./header";
import PhotoGallery from '../../components/photoGallery';

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const post = getAllPosts(['title', 'description', 'date', 'slug', 'image', 'photos', 'content'])
    .find((post) => post.slug === slug);

  if (!post) {
    notFound();
  } else post.content = await markdownToHtml(post.content || '');

  const views: number = 1665

  const images: string[] = post.photos.toString().split(',')

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

      <PhotoGallery images={images} />
      <div className="py-10"></div>

    </div>
  );
}