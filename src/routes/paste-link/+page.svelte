<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste, TwitterIcon } from 'lucide-svelte';
	import { getVideoBlob, getVideoInfo, postVideoToSocialMedia } from '$lib/api';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { onMount } from 'svelte';
	import { urlHero } from '$lib/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { type User } from 'firebase/auth';
	import { getUser, signInWithTwitter } from '$lib/firebase';

	let link: string = '';
	let thumbNail: string = '';
	let title: string = '';
	let downloadUrl: string = '';
	let isLoading: boolean = false;
	let isDownloadLoading: boolean = false;
	let isPostVideoLoading: boolean = false;
	let user: User | null;

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
				console.log(res);
			})
			.catch((err) => {
				isLoading = false;
				console.log(err);
				toast.error('Failed: ' + err.message, {
					position: 'top-right'
				});
				isLoading = false;
			});
	};

	const handleDownload = async () => {
		isDownloadLoading = true;
		getVideoBlob(link)
			.then((blob) => {
				let blobUrl = URL.createObjectURL(blob);

				const data: HTMLAnchorElement = document.createElement('a');
				data.href = blobUrl;
				data.download = `${title}.mp4`;
				data.style.display = 'none';

				document.body.appendChild(data);

				data.click();

				document.body.removeChild(data);
				URL.revokeObjectURL(blobUrl);
				toast.success('Video downloaded successfully', { position: 'top-right' });
				isDownloadLoading = false;
			})
			.catch((err) => {
				toast.error('Failed: ' + err.message, {
					position: 'top-right'
				});
				isDownloadLoading = false;
			});
	};

	const handleSocialLogin = async () => {
		signInWithTwitter()
			.then(() => {
				toast.success('Logged in successfully!', {
					position: 'top-right'
				});
			})
			.catch((error) => {
				toast.error('Failed: ' + error.message, {
					position: 'top-right'
				});
			});
	};

	const handlePostSocialMedia = async () => {
		isPostVideoLoading = true;
		toast.info(
			`Video processing initiated. Duration may vary. Our server will handle it. You safely can close this page.`,
			{
				position: 'top-right',
				duration: 70000
			}
		);
		postVideoToSocialMedia(link)
			.then(() => {
				isPostVideoLoading = false;
				toast.success('Posted successfully!', {
					position: 'top-right'
				});
			})
			.catch((error) => {
				isPostVideoLoading = false;
				toast.error('Failed: ' + error.message, {
					position: 'top-right'
				});
			});
	};

	getUser((data) => {
		user = data || null;
	});

	onMount(() => {
		if ($urlHero) {
			link = $urlHero;
			handleLinkValidation();
			if (isValidLink(link)) {
				handleSubmit();
			}
		}
	});
</script>

<div class="flex h-screen flex-col items-center p-5">
	<h1 class="mb-8 mt-20 max-w-md text-center text-4xl font-bold">
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
				data-umami-event="Clipboard paste button"
				variant="secondary"
				size="icon"
				class="absolute right-2 top-1/2 -translate-y-1/2 transform "
				on:click={pasteFromClipboard}
			>
				<ClipboardPaste class="h-6 w-6 text-muted-foreground" />
			</Button>
		</div>
	</form>
	<Dialog.Root>
		<Dialog.Trigger>
			<p
				class="md:text-md mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 lg:mb-8 lg:text-lg"
			>
				We support many websites ⓘ
			</p>
		</Dialog.Trigger>
		<Dialog.Content class="max-w-[14rem] rounded-lg">
			<Dialog.Header>
				<Dialog.Title class="text-center">Supported sites</Dialog.Title>
				<Dialog.Description class="text-center">
					<p>Facebook Reels</p>
					<p>Instagram Reels</p>
					<p>YouTube shorts</p>
					<p>Vimeo</p>
					<p>TikTok</p>
					<p>Twitter</p>
					<p>Reddit</p>
					<p>9GAG</p>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
	<Button
		data-umami-event="Get info button"
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
	{#if isLoading}
		<div class="w-full max-w-md space-y-2 px-5 pb-6">
			<Separator class="my-8" />
			<Skeleton class="h-[250px] " />
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	{/if}
	{#if thumbNail}
		<Separator class="my-8" />
		<div class="mx-auto max-w-md px-5">
			<p class="mx-auto mb-6 mt-4 max-w-md text-center text-2xl font-medium">{title}</p>
			<video class="mb-6 rounded-lg shadow-md" controls src={downloadUrl}
				><track kind="captions" /></video
			>
			<Button
				data-umami-event="Download button"
				class="mx-auto mb-4 w-full max-w-md"
				disabled={isDownloadLoading}
				on:click={handleDownload}
			>
				{#if isDownloadLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<span>Download video</span>
				{/if}
			</Button>
			{#if user}
				<Button
					data-umami-event="Social post button"
					variant="secondary"
					class="mx-auto mb-4 w-full max-w-md"
					disabled={isPostVideoLoading}
					on:click={handlePostSocialMedia}
				>
					{#if isPostVideoLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{:else}
						<span>Post to X</span>
					{/if}
				</Button>
			{:else}
				<Dialog.Root>
					<Dialog.Trigger class="mx-auto mb-20 block w-full max-w-md">
						<Button
							data-umami-event="Social login button"
							variant="secondary"
							class="w-full max-w-md"
						>
							Login to Share
						</Button>
					</Dialog.Trigger>
					<Dialog.Content class="max-w-xs rounded-2xl text-center">
						<Dialog.Header>
							<Dialog.Title>Login with social media</Dialog.Title>
							<Dialog.Description>
								<div class="mx-auto mt-4 flex max-w-[10rem] flex-col justify-center space-y-2">
									<Button variant="outline" on:click={handleSocialLogin}>X (Twitter)</Button>
								</div>
							</Dialog.Description>
						</Dialog.Header>
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		</div>
	{/if}
</div>
