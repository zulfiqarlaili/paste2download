<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { getVideoInfo } from '$lib/api';

	let link: string = '';
	let purifyedLink: string = '';
	let isLoading: boolean = false;
  let copyButtonVariant: 'outline' | 'secondary' = 'outline';
  let copyButtonText: string = 'Copy link';

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
			await navigator.clipboard.writeText(purifyedLink);
      copyButtonVariant = 'secondary';
      copyButtonText = 'Copied!';
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
	<h1 class="mb-4 text-3xl font-bold">Purify Your TikTok Links</h1>
	<p class="max-w-xl text-gray-500 dark:text-gray-400">
		Remove extra data from your TikTok links and share videos without revealing your <strong
			>personal info</strong
		>. Just <strong>paste your link</strong>, and get a <strong>clean, privacy-safe</strong> version
		instantly!
	</p>

	<form
		class="mt-16 flex w-full max-w-sm items-center space-x-2"
		on:submit|preventDefault={handleSubmit}
	>
		{#if purifyedLink}
			<Input bind:value={purifyedLink} type="text" disabled />
		{:else}
			<Input
				bind:value={link}
				type="text"
				placeholder="Enter TikTok link to purify"
				disabled={!!purifyedLink}
			/>
		{/if}
		{#if isValidLink(link)}
			<Button disabled={isLoading} on:click={handleSubmit} type="submit">
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<span>Purify</span>
				{/if}
			</Button>
		{:else if purifyedLink}
			<Button variant={copyButtonVariant} disabled={isLoading} on:click={copyToClipboard}>{copyButtonText}</Button>
		{:else}
			<Button bind:value={link} variant="secondary" on:click={pasteFromClipboard}>Paste link</Button
			>
		{/if}
	</form>
</section>
