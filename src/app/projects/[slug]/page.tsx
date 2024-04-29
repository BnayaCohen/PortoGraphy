import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "../../util/Content";
import { markdownToHtml } from '../../util/Markdown';

// import { Mdx } from "@/app/components/mdx";
// import "./mdx.css";
import { PostContent } from '../../components/postContent';
import { Header } from "./header";
import PhotoGallery from '../../components/photoGallery';
import Video from 'next-video';
  import getStarted from '/videos/get-started.mp4';

type Props = {
  params: {
    slug: string;
  };
};

async function fetchImages(post: { [key: string]: string; }) {

  const images: string[] = [];
  if (post.photosFolder) {
    const imageDirectory: string = path.resolve(process.cwd(), 'public', post.photosFolder);
    const imageFilenames: string[] = await fs.readdir(imageDirectory);
    const imagesPaths: string[] = imageFilenames.map((fileName: string) =>
      ('/' + post.photosFolder + '/' + fileName).replace('/public', '').replace('public', '')
    );

    images.push(...shuffleImages(imagesPaths));
  }
  return images;
}

const shuffleImages = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default async function PostPage({ params }: Props) {

  const slug = params.slug;
  if (!getPostSlugs().includes(slug + '.md')) notFound();

  const post = getPostBySlug(slug, ['title', 'description', 'date', 'slug', 'image', 'photosFolder', 'content']);

  let images: string[] = [];
  try {
    post.content = await markdownToHtml(post.content || '');
    images = await fetchImages(post)
  } catch (err) {
    console.error(err)
  }

  return (
    <div className="min-h-screen">
      <Header post={post} />

      <article className="px-4 mx-auto prose prose-zinc prose-quoteless prose-h4:text-white prose-h3:text-white prose-a:text-white text-zinc-300"> {/* py-12  */}
        {/* <Mdx code={post.body.code} /> */}
        <PostContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostContent>
      </article>

      {/* <Video src={getStarted} /> */}

      <PhotoGallery images={images} />
      <div className="py-5 text-center text-zinc-400">Thanks</div>

    </div>
  );
}