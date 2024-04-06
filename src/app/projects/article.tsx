"use client"
import { PostItems } from '../util/Content';
import Link from "next/link";
// import { Eye, View } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { getAverageColorFromImageUrl, getComplementaryColor, getContrastColor } from '../util/getAverageColor';

type Props = {
	project: PostItems;
	// views: number;
};

export const Article: React.FC<Props> = ({ project }) => { // , views 
	const [averageColor, setAverageColor] = useState<string>('#000');
	const [compColor, setCompColor] = useState<string>('#000');

	useEffect(() => {
		async function fetchAverageColor() {
			try {
				const color: string = await getAverageColorFromImageUrl(project.image);
				setAverageColor(color);
				setCompColor(getContrastColor(color));
			} catch (error) {
				console.error('Error fetching average color:', error);
			}
		}
		fetchAverageColor();
	}, [project.image]);

	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8 h-60 sm:h-80" style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
				{/* <div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div> */}

				<h2 className={`z-20 text-zinc-200 text-xl text-right drop-shadow-sm font-medium duration-1000 lg:text-3xl group-hover:text-white font-display`}
					 style={{ color: averageColor, textShadow: `0 0 0px ${compColor}, 0 0 2px ${compColor}` }}>
						 {/*  */}
					{project.title}
				</h2>
				
				{/* <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p> */}
			</article>
		</Link>
	);
};
