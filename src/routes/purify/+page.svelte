<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { getVideoInfo } from '$lib/api';
	import { onMount } from 'svelte';
	import { ClipboardPaste } from 'lucide-svelte';

	let link: string = '';
	let purifiedLink: string = '';
	let isLoading: boolean = false;
	let copyButtonVariant: 'outline' | 'secondary' = 'outline';
	let copyButtonText: string = 'Copy link';
	let directLink: boolean = false;

	$: link, sanitizeLink();

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
			await navigator.clipboard.writeText(purifiedLink);
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

	const sanitizeLink = () => {
		link = link.replace('Enjoy this post in TikTok:', '').trim();
	};

	const handleLocalStorage = () => {
		localStorage.setItem('directLink', JSON.stringify(!directLink));
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
				purifiedLink = res.original_url;
				if (directLink) {
					window.open(purifiedLink, '_blank', 'noopener,noreferrer');
				}
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

	onMount(() => {
		const savedDirectLink = localStorage.getItem('directLink');
		console.log(savedDirectLink);
		if (savedDirectLink) {
			directLink = JSON.parse(savedDirectLink);
		} else {
			localStorage.setItem('directLink', JSON.stringify(directLink));
		}
	});
</script>

<section class="purify-section flex flex-col items-center justify-center px-4 pt-16 text-center">
	<h1 data-aos="fade-up" data-aos-delay="100" class="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
		Purify Your TikTok Links
	</h1>
	<p data-aos="fade-up" data-aos-delay="100" class="max-w-xl text-gray-500 dark:text-gray-400 text-lg">
		Remove extra data from your TikTok links and share videos without revealing your <strong
			>personal info</strong
		>. Just <strong>paste your link</strong>, and get a <strong>clean, privacy-safe</strong> version
		instantly!
	</p>

	<form
		data-aos="fade-up"
		data-aos-delay="200"
		class="mt-16 flex w-full max-w-md flex-col items-center space-y-4"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="relative w-full">
			{#if purifiedLink}
				<Input class="w-full rounded-lg border p-3 pr-12 text-base" bind:value={purifiedLink} type="text" disabled />
			{:else}
				<Input
					class="w-full rounded-lg border p-3 pr-12 text-base"
					bind:value={link}
					type="text"
					placeholder="Enter TikTok link to purify"
					disabled={!!purifiedLink}
				/>
				<Button
					data-umami-event="Clipboard paste button"
					variant="ghost"
					size="icon"
					class="absolute right-2 top-1/2 -translate-y-1/2 transform text-muted-foreground hover:bg-transparent hover:text-primary"
					on:click={pasteFromClipboard}
				>
					<ClipboardPaste class="h-5 w-5" />
				</Button>
			{/if}
		</div>

		{#if isValidLink(link)}
			<Button
				class="w-full py-3 text-lg font-semibold"
				data-umami-event="Purify button"
				disabled={isLoading}
				on:click={handleSubmit}
				type="submit"
			>
				{#if isLoading}
					<Loader2 class="mr-2 h-5 w-5 animate-spin" />
				{:else}
					<span>Purify Link</span>
				{/if}
			</Button>
		{:else if purifiedLink}
			<Button
				class="w-full py-3 text-lg font-semibold"
				data-umami-event="Purify copy button"
				variant={copyButtonVariant}
				disabled={isLoading}
				on:click={copyToClipboard}>{copyButtonText}</Button
			>
		{:else}
			<Button
				class="w-full py-3 text-lg font-semibold"
				data-umami-event="Purify paste button"
				bind:value={link}
				variant="secondary"
				on:click={pasteFromClipboard}>Paste Link</Button
			>
		{/if}
		<div
			data-aos="fade-up"
			data-aos-delay="250"
			class="flex w-full items-center justify-between space-x-4 rounded-lg border p-4 shadow-sm"
		>
			<div class="flex flex-col items-start justify-center space-y-1">
				<Label for="direct-link" class="text-base font-medium leading-none">Open link directly</Label>
				<Label for="direct-link" class="text-sm text-muted-foreground">
					Automatically open the purified link in a new tab.
				</Label>
			</div>
			<Switch id="direct-link" bind:checked={directLink} on:click={handleLocalStorage} />
		</div>
	</form>
</section>