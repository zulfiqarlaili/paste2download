<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste, DownloadIcon } from 'lucide-svelte';
	import { getVideoInfo } from '$lib/api';
	import { Separator } from '$lib/components/ui/separator';

	let link: string = '';
	let thumbNail: string = '';
	let title: string = '';
	let downloadUrl: string = '';

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
			downloadUrl = res.download_url;
		});
	};

	const handleDownload = async () => {
		try {
			const response = await fetch(downloadUrl);
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
					'video/mpeg': '.mpeg'
				};

				for (const [key, value] of Object.entries(videoFormats)) {
					if (contentType && contentType.includes(key)) {
						return value;
					}
				}

				return '.mp4'; // Default to .mp4 if content type is unknown
			};
			const fileExtension = getFileExtension(contentType);
			const fileName = `${title
				.replaceAll(' ', '_')
				.replace(/[^\x00-\x7F]/g, '')
				.replace(/#[a-z0-9_]+/gi, '')}${fileExtension}`;
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
					on:click={handleDownload}
				>
					<DownloadIcon class="h-12 w-12" />
				</button>
			</figure>
		{/if}
	</div>
</div>
