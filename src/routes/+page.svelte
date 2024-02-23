<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
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
			href='/paste-link'>Get Started</Button
		>

		<Separator class="my-8" />
		<div data-aos="fade-up" data-aos-delay="600">
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				How does it work
			</h2>
			<p class="mx-auto max-w-[30rem] text-sm text-muted-foreground">
				Paste a video link to get started; mostly TikTok have watermark in their videos that we want
				to remove; paste and let the magic happen
			</p>
		</div>
	</div>
</div>

