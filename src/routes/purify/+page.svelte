<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { getVideoInfo } from '$lib/api';

	let link: string = '';
	let purifyedLink: string = '';
	let isLoading: boolean = false;
	let copyButtonVariant: 'outline' | 'secondary' = 'outline';
	let copyButtonText: string = 'Copy link';
	let directLink: boolean = false;

	$: link, sanitizeLink();
	$: directLink, directLinkHandler();

	const isValidLink = (link: string): boolean => {
		const linkRegex = /https?:\/\/\S*tiktok\S*/;
		return linkRegex.test(link);
	};

	const handleLinkValidation = () => {
		if (!isValidLink(link)) {
			toast.error('Invalid link', {
				description: 'Please enter a valid TikTok link',
				position: 'top-right'
			});
			return false;
		}
		return true;
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

	const copyToClipboard = async () => {
		toast.success('Link copied to clipboard', {
			position: 'top-right'
		});
		try {
			if (directLink) {
				window.open(purifyedLink, '_blank', 'noopener,noreferrer');
			} else {
				await navigator.clipboard.writeText(purifyedLink);
				copyButtonVariant = 'secondary';
				copyButtonText = 'Copied!';
			}
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

	const sanitizeLink = () => {
		link = link.replace('Enjoy this post in TikTok:', '').trim();
	};

	const directLinkHandler = () => {
		if (directLink) {
			copyButtonVariant = 'outline';
			copyButtonText = 'Open link';
		} else {
			copyButtonVariant = 'outline';
			copyButtonText = 'Copy link';
		}
	};

	const handleSubmit = () => {
		if (!handleLinkValidation()) return;

		toast.loading('Grabbing original link', {
			description: 'Please wait',
			position: 'top-right',
			duration: 2000
		});
		isLoading = true;
		getVideoInfo(link)
			.then(async (res: any) => {
				link = '';
				isLoading = false;
				purifyedLink = res.original_url;
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
</script>

<section class="purify-section flex flex-col items-center justify-center px-4 pt-16 text-center">
	<h1 data-aos="fade-up" data-aos-delay="100" class="mb-4 text-3xl font-bold">
		Purify Your TikTok Links
	</h1>
	<p data-aos="fade-up" data-aos-delay="100" class="max-w-xl text-gray-500 dark:text-gray-400">
		Remove extra data from your TikTok links and share videos without revealing your <strong
			>personal info</strong
		>. Just <strong>paste your link</strong>, and get a <strong>clean, privacy-safe</strong> version
		instantly!
	</p>

	<form
		data-aos="fade-up"
		data-aos-delay="200"
		class="mt-16 flex w-full max-w-sm flex-col items-center"
		on:submit|preventDefault={handleSubmit}
	>
		{#if purifyedLink}
			<Input class="my-2" bind:value={purifyedLink} type="text" disabled />
		{:else}
			<Input
				class="my-2"
				bind:value={link}
				type="text"
				placeholder="Enter TikTok link to purify"
				disabled={!!purifyedLink}
			/>
		{/if}
		{#if isValidLink(link)}
			<Button
				class="mx-auto my-2 w-full"
				data-umami-event="Purify button"
				disabled={isLoading}
				on:click={handleSubmit}
				type="submit"
			>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<span>Purify</span>
				{/if}
			</Button>
		{:else if purifyedLink}
			<Button
				class="mx-auto my-2 w-full"
				data-umami-event="Purify copy button"
				variant={copyButtonVariant}
				disabled={isLoading}
				on:click={copyToClipboard}>{copyButtonText}</Button
			>
		{:else}
			<Button
				class="mx-auto my-2 w-full"
				data-umami-event="Purify paste button"
				bind:value={link}
				variant="secondary"
				on:click={pasteFromClipboard}>Paste link</Button
			>
		{/if}
		<div data-aos="fade-up" data-aos-delay="250" class="flex space-x-2">
			<Label for="direct-link">Open link directly</Label>
			<Switch id="direct-link" bind:checked={directLink} />
		</div>
	</form>
</section>
