"use client";
import "./films.css";
import { Navigation } from "../components/nav";
import YouTube, { YouTubeProps } from 'react-youtube';
import React, { useEffect, useRef, useState } from "react";

const videos = [
	{
		url: "6zpqjak-ZXc",
		description: "This project captures the essence of my transformative 8-month adventure across South America. It demonstrates the power of visual storytelling and sound design to evoke emotions and create lasting memories.",
		quote: "''Don’t ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is more people to come alive.''  Howard Thurman.",
		label: "South America",
	},
	{
		url: "2dtzHGOl4GI",
		// description: "This captivating video explores the heart of Nepal through the lens of an Israeli volunteer association. Witness the beauty of the Himalayas alongside the impactful volunteer work undertaken by our dedicated group.",
		description: "This video doesn't just document a volunteer trip to Nepal, it tells a powerful story of cultural immersion, selfless service, and the breathtaking landscapes of the Himalayas.",
		quote: "''No one has ever became poor by giving.''",
		label: "Nepal",
	},
	{
		url: "9b4nYhLJ6Q0",
		description: "This video takes you on a journey along the Israel National Trail, capturing the pure joy of getting lost in nature. Forget narration – the landscapes, rhythmic movement, and expertly edited shots tell the story themselves.",
		quote: "''A journey of a thousand miles begins with one single step.''",
		label: "Israel National Trail",
	},
];

export default function Films() {

	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',

		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
			controls: 2,
			rel: 0,
			color: 'white',
		},
	};

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />

			<header className="relative isolate overflow-hidden mb-8 bg-gradient-to-tl from-black via-zinc-900 to-black" style={{backgroundImage: `url('/assets/images/0Z4A6740.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
				<div
					className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
						}`}
				></div>
				<div className="container mx-auto relative isolate overflow-hidden pt-24 pb-16 sm:py-32 sm:pb-24">
					<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
						<div className="mx-auto max-w-2xl lg:mx-0">
							<h1 className="text-4xl drop-shadow-md font-bold tracking-tight text-white sm:text-6xl font-display">
								Personal Films
							</h1>
							<p className="mt-6 text-md drop-shadow-sm leading-7 text-zinc-100">
								I turn experiences into captivating stories. This collection showcases my ability to take real-life adventures and transform them into emotionally resonant videos.
							</p>
						</div>
					</div>
				</div>
			</header>

			<div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
				<div className="grid grid-cols-1 gap-8">
					{videos.map((video, index) => (
						<article key={index}>
							<div className="mb-24 w-96 sm:w-128 md:w-168 lg:w-224 xl:w-248">
								<div className="flex flex-col items-center justify-center gap-4 duration-700 group">
									<span className="text-3xl font-medium text-center text-zinc-200 font-display">
										{video.label}
									</span>
									<div className="text-m px-1 text-center text-zinc-400">
										{video.description}
									</div>
									<div className="w-full">
										<div className="embed-responsive">
											<YouTube videoId={video.url} opts={opts} />
										</div>
									</div>
									<div className="text-sm w-10/12 text-center text-zinc-500">
										{video.quote}
									</div>
								</div>
							</div>
							{index !== videos.length - 1 && (
								<div className="flex justify-center">
									<div className="w-10/12 bg-gradient-to-r from-transparent via-zinc-500 to-transparent pt-px" />
								</div>
							)}
						</article>
					))}
				</div>
				<div className="py-4"></div>
			</div>
		</div>
	);
}