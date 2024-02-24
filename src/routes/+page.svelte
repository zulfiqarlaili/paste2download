<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Check } from 'lucide-svelte';
</script>

<div class="mt-20 flex min-h-screen justify-center">
	<div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
		<h1
			class="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl"
			data-aos="fade-up"
		>
			Easy video downloads
			<br />
			<span
				class="block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
				data-aos="fade-up">no watermark</span
			>
		</h1>
		<p
			class="mb-8 text-lg text-muted-foreground sm:px-16 lg:text-xl xl:px-48"
			data-aos="fade-up"
			data-aos-delay="300"
		>
			Download videos effortlessly, remove watermarks, and share instantly. Welcome to
			Paste2Download
		</p>
		<Button
			class="w-36 bg-gradient-to-r from-blue-500 to-teal-400"
			data-aos="fade-up"
			data-aos-delay="300"
			href="/paste-link">Get Started</Button
		>

		<Separator class="my-16" />
		<div data-aos="fade-up" data-aos-delay="600">
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				How does it work
			</h2>
			<p class="mx-auto max-w-[30rem] text-sm text-muted-foreground">
				Paste a video link to get started; mostly <b>TikTok</b> have watermark in their videos that we
				want to remove; paste and let the magic happen
			</p>
		</div>
		<Separator class="my-16" />
		<div class="mx-auto max-w-[30rem]" data-aos="fade-up" data-aos-delay="900">
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Product roadmap
			</h2>

			<ol class="relative mt-8 border-s border-gray-200 text-left dark:border-gray-700">
				<li class="mb-10 ms-6">
					<span
						class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 ring-8 ring-white dark:bg-green-700 dark:ring-gray-900"
					>
						<Check class="h-4 w-4" />
					</span>
					<h3 class="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
						Easy TikTok Video Downloader
					</h3>
					<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						Simply paste the link of your favorite TikTok video and download it hassle-free,
						completely watermark-free.
					</p>
				</li>
				<li class="mb-10 ms-6">
					<span
						class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-slate-700 dark:ring-gray-900"
					>
					</span>
					<h3 class="mb-1 text-lg font-semibold text-gray-400 dark:text-gray-500">
						<!-- <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"> -->
						Integration with X (formerly Twitter)
					</h3>
					<p class="font-normal text-gray-400 text-base dark:text-gray-500">
						<!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400"> -->
						Instantly share your video link to your X account. We'll download and remove the
						watermark for you, posting it on your X instantly. No need to download it yourself.
					</p>
				</li>
				<li class="mb-10 ms-6">
					<span
						class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-slate-700 dark:ring-gray-900"
					>
					</span>
					<h3 class="mb-1 text-lg font-semibold text-gray-400 dark:text-gray-500">
						<!-- <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"> -->
						Integration with Facebook
					</h3>
					<p class="font-normal text-gray-400 text-base dark:text-gray-500">
						<!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400"> -->
						Coming soon
					</p>
				</li>
				<li class="mb-10 ms-6">
					<span
						class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-slate-700 dark:ring-gray-900"
					>
					</span>
					<h3 class="mb-1 text-lg font-semibold text-gray-400 dark:text-gray-500">
						<!-- <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"> -->
						Integration with Shopee affiliate
					</h3>
					<p class="font-normal text-gray-400 text-base dark:text-gray-500">
						<!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400"> -->
						Coming soon
					</p>
				</li>
			</ol>
		</div>
	</div>
</div>
