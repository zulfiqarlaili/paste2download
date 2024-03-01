<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste } from 'lucide-svelte';
	import { getVideoInfo } from '$lib/api';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { onMount } from 'svelte';
	import { urlHero } from '$lib/store';

	let link: string = '';
	let thumbNail: string = '';
	let title: string = '';
	let downloadUrl: string = '';
	let isLoading: boolean = false;

	const isValidLink = (link: string): boolean => {
		const linkRegex = /https?:\/\/\S+/;
		return linkRegex.test(link);
	};

	const pasteFromClipboard = async () => {
		try {
			const text = await navigator.clipboard.readText();
			link = text;
			handleLinkValidation();
		} catch (err: any) {
			if (err.name === 'NotAllowedError') {
				toast.error('Clipboard access denied', {
					description: 'Please allow clipboard access and try again',
					position: 'top-right'
				});
			} else {
				toast.error('Failed: ' + err.message, {
					position: 'top-right'
				});
			}
		}
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
		toast.loading('Getting video info...', {
			description: 'Please wait',
			position: 'top-right'
		});
		isLoading = true;
		thumbNail = '';
		title = '';
		downloadUrl = '';

		getVideoInfo(link)
			.then((res: any) => {
				isLoading = false;
				thumbNail = res.thumbnail;
				title = res.title;
				downloadUrl = res.download_url;
			})
			.catch((err) => {
				isLoading = false;
				toast.error('Failed: ' + err.message, {
					position: 'top-right'
				});
				isLoading = false;
			});
	};

	const handleDownload = async () => {
		try {
			const response = await fetch(downloadUrl);
			if (!response.ok) {
				toast.error(`Error downloading the video ${response.status}`, { position: 'top-right' });
				return;
			}
			const contentType = response.headers.get('content-type');
			const getFileExtension = (contentType: any) => {
				const videoFormats = {
					'video/webm': '.webm',
					'video/ogg': '.ogg',
					'video/mp4': '.mp4',
					'video/x-matroska': '.mkv',
					'video/quicktime': '.mov',
					'video/x-msvideo': '.avi',
					'video/x-ms-wmv': '.wmv',
					'video/mpeg': '.mpeg',
					'application/x-mpegURL': '.m3u8'
				};

				for (const [key, value] of Object.entries(videoFormats)) {
					if (contentType && contentType.includes(key)) {
						return value;
					}
				}

				return '.mp4'; // Default to .mp4 if content type is unknown
			};
			const fileExtension = getFileExtension(contentType);
			const fileName = `${title}${fileExtension}`;
			const blob = await response.blob();
			const anchorElement = document.createElement('a');
			anchorElement.href = window.URL.createObjectURL(blob);
			anchorElement.download = fileName;
			document.body.appendChild(anchorElement);
			await anchorElement.click();
			document.body.removeChild(anchorElement);
		} catch (error) {
			toast.error('Error downloading the video', {
				position: 'top-right'
			});
		}
	};

	onMount(() => {
		if ($urlHero) {
			link = $urlHero;
			handleLinkValidation();
		}
	});
</script>

<div class="flex h-screen flex-col items-center p-5">
	<h1 class="mb-8 mt-[15rem] max-w-md text-center text-4xl font-bold">
		Download videos from any website
	</h1>
	<form
		class="mb-8 flex w-full max-w-md items-center space-x-2"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="relative w-full">
			<Input
				bind:value={link}
				type="text"
				placeholder="Enter video URL here..."
				class=" p-7 text-lg"
			/>
			<Button
				variant="secondary"
				size="icon"
				class="absolute right-2 top-1/2 -translate-y-1/2 transform "
				on:click={pasteFromClipboard}
			>
				<ClipboardPaste class="h-6 w-6 text-muted-foreground" />
			</Button>
		</div>
	</form>
	<p
		class="md:text-md mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 lg:mb-8 lg:text-lg"
	>
		We support many websites
	</p>
	<Button
		class="mx-auto w-full max-w-md"
		disabled={!isValidLink(link) || isLoading}
		on:click={handleSubmit}
		type="submit"
	>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<span>Get video</span>
		{/if}
	</Button>
	<div>
		<Separator class="my-8" />
		{#if isLoading}
			<div class="flex items-center">
				<div class="space-y-2">
					<Skeleton class="h-[250px] w-[450px]" />
					<Skeleton class="h-4 w-[250px]" />
					<Skeleton class="h-4 w-[200px]" />
				</div>
			</div>
		{/if}
		{#if thumbNail}
			<div data-aos="fade-up">
				<p class="mx-auto mb-6 mt-4 max-w-md text-center text-lg font-medium">{title}</p>
				<video
					class="relative mx-auto mb-6 max-w-md rounded-lg shadow-md"
					controls
					src={downloadUrl}><track kind="captions" /></video
				>
				<Button class="mx-auto mb-20 block w-full max-w-md" on:click={handleDownload}>
					Download
				</Button>
			</div>
		{/if}
	</div>
</div>
