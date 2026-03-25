<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Flame, Images, Lightbulb, UserX } from 'lucide-svelte';
	import hereVideo from '$lib/assets/hero.mp4';
	import { urlHero } from '$lib/store';
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator';
</script>

<!-- Ambient glowing backgrounds for the hero section -->
<div class="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
	<div class="absolute -top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen opacity-70"></div>
	<div class="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] mix-blend-screen opacity-50"></div>
</div>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
	<section
		class="flex flex-col items-center justify-center gap-12 py-20 sm:flex-row sm:py-24 lg:py-32"
		data-aos="fade-up"
		data-aos-delay="100"
	>
		<div class="flex-1 text-center sm:text-left relative z-10">
			<h1
				class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-7xl drop-shadow-sm"
			>
				Download TikTok videos and remove
				<span
					class="bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500 bg-clip-text text-transparent pb-2"
				>
					watermarks
				</span>
			</h1>
			<p class="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:text-xl font-medium">
				Enter the TikTok URL below and get your clean video instantly with a single click.
			</p>
			<div class="flex justify-center sm:justify-start">
				<form class="flex w-full max-w-md items-center relative group" on:submit|preventDefault={() => goto('/paste-link')}>
					<div class="relative w-full rounded-2xl shadow-lg ring-1 ring-border/50 bg-background/60 backdrop-blur-md transition-all duration-300 focus-within:ring-primary/50 focus-within:shadow-xl focus-within:shadow-primary/10">
						<Input
							bind:value={$urlHero}
							type="text"
							placeholder="Paste video URL here..."
							class="rounded-2xl p-6 pr-32 text-lg border-0 bg-transparent focus-visible:ring-0 shadow-none placeholder:text-muted-foreground/70"
						/>
						<Button
							type="submit"
							data-umami-event="Landing Hero button"
							class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-xl font-semibold shadow-sm transition-transform hover:scale-105"
						>
							Download
						</Button>
					</div>
				</form>
			</div>
		</div>
		<div class="flex-1 relative mt-10 sm:mt-0">
			<!-- Video Glow Frame -->
			<div class="absolute inset-x-8 inset-y-8 bg-gradient-to-tr from-emerald-500/30 to-teal-400/30 blur-3xl -z-10 rounded-full animate-pulse opacity-60"></div>
			
			<video
				class="mx-auto w-full max-w-lg rounded-2xl shadow-2xl ring-1 ring-white/10 dark:ring-white/5 bg-black"
				controls
				autoplay
				loop
				playsinline
				style="pointer-events: none"
				src={hereVideo}
			>
				<track kind="captions" />
			</video>
		</div>
	</section>

	<div class="mt-24 text-center" data-aos="fade-up" data-aos-delay="200">
		<h2
			class="mb-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl"
		>
			Why Use TTClip?
		</h2>
		<p class="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
			The easiest way to remove watermarks from TikTok videos and repurpose your content.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" data-aos="fade-up" data-aos-delay="300">
		<div class="group relative overflow-hidden space-y-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
			<div class="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:-rotate-12">
				<Flame class="h-24 w-24 text-primary" />
			</div>
			<div class="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary mb-2">
				<Flame class="h-6 w-6" />
			</div>
			<h3 class="text-xl font-bold tracking-tight text-foreground relative z-10">
				Fast Download Speeds
			</h3>
			<p class="text-muted-foreground relative z-10 leading-relaxed">
				Download your high-resolution videos instantly via our globally distributed and optimized servers.
			</p>
		</div>

		<div class="group relative overflow-hidden space-y-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
			<div class="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:-rotate-12">
				<Images class="h-24 w-24 text-primary" />
			</div>
			<div class="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary mb-2">
				<Images class="h-6 w-6" />
			</div>
			<h3 class="text-xl font-bold tracking-tight text-foreground relative z-10">
				Multiple Formats
			</h3>
			<p class="text-muted-foreground relative z-10 leading-relaxed">
				Export directly to MP4 Video or extract the MP3 Audio track in pristine maximum quality to suit any project.
			</p>
		</div>

		<div class="group relative overflow-hidden space-y-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
			<div class="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:-rotate-12">
				<UserX class="h-24 w-24 text-primary" />
			</div>
			<div class="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary mb-2">
				<UserX class="h-6 w-6" />
			</div>
			<h3 class="text-xl font-bold tracking-tight text-foreground relative z-10">
				No Account Required
			</h3>
			<p class="text-muted-foreground relative z-10 leading-relaxed">
				Access all premium generation features completely free without the hassle of signing up or logging in.
			</p>
		</div>
	</div>

	<div class="my-32 text-center" data-aos="fade-up" data-aos-delay="300">
		<h2
			class="mx-auto mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
		>
			Start Downloading Now
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
			Enter the video URL and experience our hassle-free download process.
		</p>
		<Button 
			data-umami-event="Landing Get Started button" 
			on:click={() => goto('/paste-link')} 
			size="lg"
			class="h-14 px-8 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-transform hover:scale-105"
		>
			Get Started
		</Button>
	</div>

	<Separator class="my-16 opacity-50" />

	<div
		class="mx-auto flex max-w-3xl flex-col items-center justify-center pb-32"
		data-aos="fade-up"
		data-aos-delay="300"
	>
		<h2
			class="mb-16 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl text-center"
		>
			Product Roadmap
		</h2>

		<ol class="relative border-s border-border dark:border-border/60 ml-4 md:ml-0">
			<li class="mb-12 ms-8 group">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-background dark:bg-emerald-900 shadow-sm transition-transform duration-300 group-hover:scale-110"
				>
					<svg
						class="h-4 w-4 text-emerald-600 dark:text-emerald-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 12"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M1 5.917 5.724 10.5 15 1.5"
						/>
					</svg>
				</span>
				<h3 class="font-bold text-xl text-foreground mb-1">Remove watermarks</h3>
				<p class="text-base text-muted-foreground">
					Strip watermarks seamlessly from all TikTok videos with our integrated system.
				</p>
			</li>
			<li class="mb-12 ms-8 group">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-background dark:bg-emerald-900 shadow-sm transition-transform duration-300 group-hover:scale-110"
				>
					<svg
						class="h-4 w-4 text-emerald-600 dark:text-emerald-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 12"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M1 5.917 5.724 10.5 15 1.5"
						/>
					</svg>
				</span>
				<h3 class="font-bold text-xl text-foreground mb-1">Seamless Social Media Integration</h3>
				<p class="text-base text-muted-foreground">
					Post unwatermarked videos directly to your X accounts right from our interface.
				</p>
			</li>
			<li class="mb-12 ms-8 group">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-4 ring-background border border-border shadow-sm transition-transform duration-300 group-hover:scale-110"
				>
					<Lightbulb class="h-4 w-4 text-muted-foreground" />
				</span>
				<h3 class="font-bold text-xl text-muted-foreground mb-1">AI-Powered Capabilities</h3>
				<p class="text-base text-muted-foreground/80">
					Generate intelligent, engaging captions directly based on analyzing your video content.
				</p>
			</li>
			<li class="mb-12 ms-8 group">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-4 ring-background border border-border shadow-sm transition-transform duration-300 group-hover:scale-110"
				>
					<Lightbulb class="h-4 w-4 text-muted-foreground" />
				</span>
				<h3 class="font-bold text-xl text-muted-foreground mb-1">
					Shopee Affiliate Hub
				</h3>
				<p class="text-base text-muted-foreground/80">
					Grab affiliate links and post them perfectly formatted alongside your reposted viral clips.
				</p>
			</li>
			<li class="ms-8 group">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-4 ring-background border border-border shadow-sm transition-transform duration-300 group-hover:scale-110"
				>
					<div class="h-2 w-2 rounded-full bg-muted-foreground/50"></div>
				</span>
				<h3 class="font-bold text-xl text-muted-foreground mb-1">More Features</h3>
				<p class="text-base text-muted-foreground/80">Constantly evolving to fit content creation needs.</p>
			</li>
		</ol>
	</div>
</div>