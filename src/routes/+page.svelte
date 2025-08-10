<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Flame, Images, Lightbulb, UserX } from 'lucide-svelte';
	import hereVideo from '$lib/assets/hero.mp4';
	import { urlHero } from '$lib/store';
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<section
		class="flex flex-col items-center justify-center gap-12 py-20 sm:flex-row sm:py-24 lg:py-32"
		data-aos="fade-up"
		data-aos-delay="100"
	>
		<div class="flex-1 text-center sm:text-left">
			<h1
				class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
			>
				Download TikTok videos and remove
				<span
					class="bg-gradient-to-r from-green-400 via-green-500 to-green-600 to-teal-500 bg-clip-text text-transparent"
				>
					watermarks
				</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400 lg:text-xl">
				Enter the TikTok URL below and get your video with a single click.
			</p>
			<div class="flex justify-center sm:justify-start">
				<form class="flex w-full max-w-sm items-center space-x-2">
					<div class="relative w-full rounded-lg">
						<Input
							bind:value={$urlHero}
							type="text"
							placeholder="Enter video URL here..."
							class="rounded-lg p-6 text-lg"
						/>
						<Button
							data-umami-event="Landing Hero button"
							on:click={() => goto('/paste-link')}
							class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg"
							>Download</Button
						>
					</div>
				</form>
			</div>
		</div>
		<div class="flex-1">
			<video
				class="mx-auto w-full max-w-lg rounded-xl shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700"
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
			Why Use Paste2Download?
		</h2>
		<p class="mx-auto mb-12 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
			Mostly used to remove watermarks from TikTok and here's what you get:
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" data-aos="fade-up" data-aos-delay="300">
		<div class="group space-y-4 rounded-xl border-2 p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
			<Flame class="h-9 w-9 text-primary" />
			<h3 class="text-xl font-semibold capitalize text-gray-800 dark:text-white">
				Fast Download Speeds
			</h3>
			<p class="text-gray-600 dark:text-gray-300">
				Download videos quickly with our optimized servers.
			</p>
		</div>

		<div class="group space-y-4 rounded-xl border-2 p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
			<Images class="h-9 w-9 text-primary" />
			<h3 class="text-xl font-semibold capitalize text-gray-800 dark:text-white">
				Multiple Formats
			</h3>
			<p class="text-gray-600 dark:text-gray-300">
				Choose from a variety of video formats to suit your needs.
			</p>
		</div>

		<div class="group space-y-4 rounded-xl border-2 p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
			<UserX class="h-9 w-9 text-primary" />
			<h3 class="text-xl font-semibold capitalize text-gray-800 dark:text-white">
				No Account Required
			</h3>
			<p class="text-gray-600 dark:text-gray-300">
				Get your videos without the hassle of creating an account.
			</p>
		</div>
	</div>

	<div class="my-24 text-center" data-aos="fade-up" data-aos-delay="300">
		<h2
			class="mx-auto mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
		>
			Start Downloading Now
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
			Enter the video URL and experience our hassle-free download process.
		</p>
		<Button data-umami-event="Landing Get Started button" on:click={() => goto('/paste-link')} size="lg"
			>Get Started</Button
		>
	</div>
	<Separator class="my-16" />

	<div
		class="mx-auto flex max-w-md flex-col items-center justify-center pb-20"
		data-aos="fade-up"
		data-aos-delay="300"
	>
		<h2
			class="mb-12 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl"
		>
			Product Roadmap
		</h2>

		<ol class="relative mb-10 border-s border-gray-200 dark:border-gray-700">
			<li class="mb-10 ms-6">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900"
				>
					<svg
						class="h-3.5 w-3.5 text-green-500 dark:text-green-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 12"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5.917 5.724 10.5 15 1.5"
						/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight text-lg">Remove watermarks</h3>
				<p class="text-sm text-muted-foreground">
					Remove watermarks from your videos from popular sites mainly TikTok
				</p>
			</li>
			<li class="mb-10 ms-6">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900"
				>
					<svg
						class="h-3.5 w-3.5 text-green-500 dark:text-green-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 12"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5.917 5.724 10.5 15 1.5"
						/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight text-lg">Seamless Social Media Integration</h3>
				<p class="text-sm text-muted-foreground">
					Post videos directly without downloading. We handle the removal of watermarks.
				</p>
			</li>
			<li class="mb-10 ms-6">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900"
				>
					<Lightbulb class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				</span>
				<h3 class="font-medium leading-tight text-muted-foreground text-lg">AI-Powered Capabilities</h3>
				<p class="text-sm text-muted-foreground">Help generate captions based on video content.</p>
			</li>
			<li class="mb-10 ms-6">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900"
				>
					<Lightbulb class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				</span>
				<h3 class="font-medium leading-tight text-muted-foreground text-lg">
					Integration with Shopee Affiliate
				</h3>
				<p class="text-sm text-muted-foreground">
					Grab affiliate links and post along with the video to social media. Discover popular
					products to promote.
				</p>
			</li>
			<li class="mb-10 ms-6">
				<span
					class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900"
				>
				</span>
				<h3 class="font-medium leading-tight text-muted-foreground text-lg">More</h3>
				<p class="text-sm text-muted-foreground">More features to come.</p>
			</li>
		</ol>
	</div>
</div>