import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from "next/navigation";
import { getAllPosts } from "../../util/Content";
import { markdownToHtml } from '../../util/Markdown';

// import { Mdx } from "@/app/components/mdx";
// import "./mdx.css";
import { PostContent } from '../../components/postContent';
import { Header } from "./header";
import PhotoGallery from '../../components/photoGallery';

type Props = {
  params: {
    slug: string;
  };
};

const shuffleImages = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default async function PostPage({ params }: Props) {

  const slug = params?.slug;
  const post = getAllPosts(['title', 'description', 'date', 'slug', 'image', 'photosFolder', 'content'])
    .find((post) => post.slug === slug);

  if (!post) {
    notFound();
  } else post.content = await markdownToHtml(post.content || '');

  let images: string[] = []

  if (post.photosFolder) {
    const imageDirectory: string = path.join(process.cwd(), post.photosFolder);
    const imageFilenames: string[] = await fs.readdir(imageDirectory)
    const imagesPathes: string[] = imageFilenames.map((fileName: string) => (post?.photosFolder + '/' + fileName).replace('/public', '').replace('public', ''))
    
    images = shuffleImages(imagesPathes)
  }
  
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header post={post} />

      <article className="px-4 mx-auto prose prose-zinc prose-quoteless"> {/* py-12  */}
        {/* <Mdx code={post.body.code} /> */}
        <PostContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostContent>
      </article>

      <PhotoGallery images={images} />
      <div className="py-10"></div>

    </div>
  );
}