<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste, DownloadIcon } from 'lucide-svelte';
	import { getVideoInfo } from '$lib/api';
	import { Separator } from '$lib/components/ui/separator';

	let link: string = '';
	// let thumbNail: string = '';
	let thumbNail: string =
		'https://p19-sign.tiktokcdn-us.com/tos-useast5-p-0068-tx/5c13f0523860440f9e142220ae5a9e79_1701790701~tplv-tiktokx-360p.webp?lk3s=d05b14bd&x-expires=1708963200&x-signature=5FuJ5Bg6Xr4RDo6%2F66h%2FCZ7HqFQ%3D&s=FEED&se=false&sh=&sc=feed_cover&l=202402251651459C7058717E4D4BF142BA';
	let title: string = '';

	const isValidLink = (link: string): boolean => {
		const linkRegex = /https?:\/\/\S+/;
		return linkRegex.test(link);
	};

	const pasteFromClipboard = async () => {
		const clipText = await navigator.clipboard.readText();
		link = clipText;
		handleLinkValidation();
	};

	const handleLinkValidation = () => {
		if (!isValidLink(link)) {
			toast.error('Invalid link', {
				description: 'Please enter a valid link',
				position: 'top-right'
			});
		}
	};

	const handleSubmit = () => {
		toast.loading('Downloading...', {
			description: 'Please wait',
			position: 'top-right'
		});
		getVideoInfo(link).then((res: any) => {
			toast.success('Downloaded successfully', {
				position: 'top-right'
			});
			console.log(res);
			thumbNail = res.thumbnail;
			title = res.title;
		});
	};
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<form class="flex w-full max-w-md items-center space-x-2" on:submit|preventDefault={handleSubmit}>
		<div class="relative w-full">
			<Input
				bind:value={link}
				type="text"
				placeholder="Enter video URL here..."
				class="p-4 pr-10 text-lg"
			/>
			<Button
				variant="ghost"
				size="icon"
				class="absolute right-0 top-0 "
				on:click={pasteFromClipboard}
			>
				<ClipboardPaste class="h-4 w-4" />
			</Button>
		</div>
		<Button disabled={!isValidLink(link)} type="submit">Get Video</Button>
	</form>
	<div>
		<Separator class="my-8" />
		{#if thumbNail}
			<figure class="relative max-w-lg">
				<img src={thumbNail} alt={title} class="rounded-lg" />
				<button
					class="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-40 p-2 text-white dark:text-gray-300 sm:opacity-100 lg:opacity-0 lg:hover:opacity-100"
				>
					<DownloadIcon class="h-12 w-12" />
				</button>
			</figure>
		{/if}
	</div>
</div>
