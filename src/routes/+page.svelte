<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Flame, Hammer, Images, Lightbulb, UserX } from 'lucide-svelte';
	import heroLogo from '$lib/assets/hero.png?enhanced';
	import { urlHero } from '$lib/store';
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="mx-auto mt-20 max-w-7xl px-5">
	<section
		class="flex flex-col items-center justify-center gap-4 sm:flex-row"
		data-aos="fade-up"
		data-aos-delay="100"
	>
		<div class="flex-1 text-center sm:mr-2">
			<video
				class="mx-auto rounded-lg shadow-lg"
				controls
				autoplay
				loop
				playsinline
				style="pointer-events: none"
				src="https://joelpublicbucket.s3.ap-southeast-1.amazonaws.com/landing.mov"
			>
				<track kind="captions" />
			</video>
		</div>
		<div class="flex-1 text-center sm:ml-2">
			<h1
				class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl"
			>
				Download TikTok videos and remove
				<span
					class="bg-gradient-to-r from-green-400 via-green-500 to-green-600 to-teal-500 bg-clip-text text-transparent"
				>
					watermarks
				</span>
			</h1>
			<p
				class="mx-auto mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
			>
				Enter the TikTok URL below and get your video with a single click.
			</p>
			<div class="flex justify-center">
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
	</section>
	<div class="mt-20" data-aos="fade-up" data-aos-delay="200">
		<h1
			class="mb-4 max-w-2xl text-2xl font-extrabold leading-none tracking-tight md:text-4xl xl:text-4xl"
		>
			Why Use Paste2Download?
		</h1>
		<p
			class="md:text-md mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 lg:mb-8 lg:text-lg"
		>
			Mostly used to remove watermarks from TikTok and here's what you get:
		</p>
	</div>

	<div class="container mx-auto px-6" data-aos="fade-up" data-aos-delay="300">
		<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
			<div class="space-y-3 rounded-xl border-2 p-8">
				<Flame class="h-8 w-8" />
				<h1 class="text-xl font-semibold capitalize text-gray-700 dark:text-white">
					Fast Download Speeds
				</h1>

				<p class=" text-gray-500 dark:text-gray-300">
					Download videos quickly with our optimized servers.
				</p>
			</div>

			<div class="space-y-3 rounded-xl border-2 p-8">
				<Images class="h-8 w-8" />
				<h1 class="text-xl font-semibold capitalize text-gray-700 dark:text-white">
					Multiple Formats
				</h1>

				<p class="text-gray-500 dark:text-gray-300">
					Choose from a variety of video formats to suit your needs.
				</p>
			</div>

			<div class="space-y-3 rounded-xl border-2 p-8">
				<UserX class="h-8 w-8" />
				<h1 class="text-xl font-semibold capitalize text-gray-700 dark:text-white">
					No Account Required
				</h1>

				<p class="text-gray-500 dark:text-gray-300">
					Get your videos without the hassle of creating an account.
				</p>
			</div>
		</div>
	</div>
	<div class="my-20 text-center" data-aos="fade-up" data-aos-delay="300">
		<h1
			class="mx-auto mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl"
		>
			Start Downloading Now
		</h1>
		<p
			class="mx-auto mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
		>
			Enter the video URL and experience our hassle-free download process.
		</p>
		<!-- <Button data-umami-event="Landing Get Started button" href="/paste-link">Get Started</Button> -->
		<Button data-umami-event="Landing Get Started button" on:click={() => goto('/paste-link')}
			>Get Started</Button
		>
	</div>
	<Separator />
</div>
<div
	class="mx-auto mt-16 flex max-w-md flex-col items-center justify-center px-12"
	data-aos="fade-up"
	data-aos-delay="300"
>
	<h1
		class="mb-8 max-w-2xl text-2xl font-extrabold leading-none tracking-tight md:text-4xl xl:text-4xl"
	>
		Product Roadmap
	</h1>

	<ol class="0 relative mb-10 border-s border-gray-200 dark:border-gray-700">
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
			<h3 class="font-medium leading-tight">Remove watermarks</h3>
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
			<h3 class="font-medium leading-tight">Seamless Social Media Integration</h3>
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
			<h3 class="font-medium leading-tight text-muted-foreground">AI-Powered Capabilities</h3>
			<p class="text-sm text-muted-foreground">Help generate captions based on video content.</p>
		</li>
		<li class="mb-10 ms-6">
			<span
				class="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900"
			>
				<Lightbulb class="h-4 w-4 text-gray-500 dark:text-gray-400" />
			</span>
			<h3 class="font-medium leading-tight text-muted-foreground">
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
			<h3 class="font-medium leading-tight text-muted-foreground">More</h3>
			<p class="text-sm text-muted-foreground">More features to come.</p>
		</li>
	</ol>
</div>
