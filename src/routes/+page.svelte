<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Flame, Images, UserX } from 'lucide-svelte';
</script>

<div class="mx-auto mt-20 max-w-7xl px-20">
	<section
		class="flex flex-col items-center justify-center gap-4 sm:flex-row"
		data-aos="fade-up"
		data-aos-delay="100"
	>
		<div class="flex-1 text-center sm:mr-2">
			<img
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
				alt="mockup"
			/>
		</div>
		<div class="flex-1 text-center sm:ml-2">
			<h1
				class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl"
			>
				Download video and remove
				<span
					class="bg-gradient-to-r from-green-400 via-green-500 to-green-600 to-teal-500 bg-clip-text text-transparent"
				>
					watermarks
				</span>
			</h1>
			<p
				class="mx-auto mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
			>
				Enter the video URL below and get your video with a single click.
			</p>
			<div class="flex justify-center">
				<form class="flex w-full max-w-sm items-center space-x-2">
					<div class="relative w-full rounded-lg">
						<Input
							type="text"
							placeholder="Enter video URL here..."
							class="rounded-lg p-6 text-lg"
						/>
						<Button class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg"
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
			Our service is fast, free, and secure. Here's what you get:
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
	<div class="my-20 text-center" data-aos="zoom-in" data-aos-delay="300">
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
		<Button href="/paste-link">Get Started</Button>
	</div>
</div>
