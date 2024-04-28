import Link from "next/link";
import React from "react";
import { getAllPosts } from "../util/Content";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

export default function ProjectsPage() {

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const allProjects = getAllPosts(['title', 'description', 'image', 'photosFolder', 'date', 'slug']);
  const views = allProjects.reduce((acc, project) => {
    acc[project.slug] = getRandomInt(0, 1000); // Adjust the range of random views as needed
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "alo-yoga")!;
  const top2 = allProjects.find((project) => project.slug === "red-sea")!;
  const top3 = allProjects.find((project) => project.slug === "snow")!;
  const sorted = allProjects
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-4 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />
        <h4 className="text-lg font-bold text-center tracking-tight text-zinc-100 sm:text-2xl">
          Photography
        </h4>

        <div className="grid grid-cols-1 gap-1 mx-auto lg:grid-cols-2">
          <Card> 
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full p-4 h-60 sm:h-80 md:p-8 lg:h-full" style={{ backgroundImage: `url(${featured.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  style={{ color: '#fff', textShadow: `0 0 0px black, 0 0 1px black` }}
                >
                  {featured.title}
                </h2>
                <p className="hidden mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300 lg:block"
                style={{ color: '#fff'}}>
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Take a look <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-1 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} />
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden w-full h-px md:block bg-zinc-800" />
        <h4 className="text-lg font-bold text-center tracking-tight text-zinc-100 sm:text-2xl">
          Videography
        </h4>

        <div className="grid grid-cols-1 gap-1 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-1">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
