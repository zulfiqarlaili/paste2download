<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { getVideoInfo } from '$lib/api';
	import { onMount } from 'svelte';
	import { ClipboardPaste, ExternalLink } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let link: string = '';
	let purifiedLink: string = '';
	let resultData: any = null;
	let isLoading: boolean = false;
	let copyButtonVariant: 'outline' | 'secondary' | 'default' = 'secondary';
	let copyButtonText: string = 'Copy';
	let directLink: boolean = false;

	$: link, sanitizeLink();
	$: if (isValidLink(link) && !isLoading && !purifiedLink) {
		handleSubmit();
	}

	const isValidLink = (url: string): boolean => {
		const linkRegex = /https?:\/\/\S*tiktok\.com\S*/i;
		return linkRegex.test(url);
	};

	const handleLinkValidation = () => {
		if (!isValidLink(link) && link.trim() !== '') {
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
			if (!isValidLink(link)) {
				handleLinkValidation();
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

	const copyToClipboard = async () => {
		toast.success('Link copied to clipboard', {
			position: 'top-right'
		});
		try {
			await navigator.clipboard.writeText(purifiedLink);
			copyButtonVariant = 'default';
			copyButtonText = 'Copied!';
			setTimeout(() => {
				copyButtonVariant = 'secondary';
				copyButtonText = 'Copy';
			}, 2000);
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
		if (link) {
			link = link.replace('Enjoy this post in TikTok:', '').trim();
		}
	};

	const handleLocalStorage = () => {
		localStorage.setItem('directLink', JSON.stringify(!directLink));
	};

	const resetForm = () => {
		link = '';
		purifiedLink = '';
		resultData = null;
		copyButtonVariant = 'secondary';
		copyButtonText = 'Copy';
	};

	const handleSubmit = () => {
		if (!isValidLink(link)) {
			handleLinkValidation();
			return;
		}

		toast.loading('Extracting pure link', {
			description: 'Please wait, removing trackers...',
			position: 'top-right',
			duration: 2000
		});
		
		isLoading = true;
		getVideoInfo(link)
			.then(async (res: any) => {
				isLoading = false;
				purifiedLink = res.original_url;
				resultData = res;
				link = ''; // clear input
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
			});
	};

	onMount(() => {
		const savedDirectLink = localStorage.getItem('directLink');
		if (savedDirectLink !== null) {
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
		Remove extra data from your TikTok links and share videos without revealing your <strong>personal info</strong>.
	</p>

	<div
		data-aos="fade-up"
		data-aos-delay="200"
		class="mt-12 flex w-full max-w-md flex-col items-center"
	>
		<!-- Multi-state area -->
		<div class="w-full relative min-h-[160px]">
			{#if isLoading}
				<div transition:fade="{{ duration: 200 }}" class="w-full flex flex-col items-center justify-center space-y-4 p-8 border rounded-xl bg-muted/20 backdrop-blur-sm shadow-sm ring-1 ring-border/50 min-h-[160px]">
					<Loader2 class="h-10 w-10 animate-spin text-primary mx-auto mb-2" />
					<p class="text-sm font-medium text-muted-foreground animate-pulse">Extracting tracker-free link...</p>
				</div>
			{:else if resultData && purifiedLink}
				<div transition:fade="{{ duration: 300 }}" class="w-full flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg ring-1 ring-border/50">
					{#if resultData.thumbnail}
						<div class="relative w-full aspect-video bg-black/5 overflow-hidden">
							<!-- blurred background -->
							<img src={resultData.thumbnail} alt="" aria-hidden="true" class="object-cover w-full h-full blur-2xl scale-110 opacity-40 absolute inset-0 mix-blend-overlay dark:mix-blend-lighten" />
							<!-- main image -->
							<img src={resultData.thumbnail} alt="Video thumbnail" class="object-contain w-full h-full relative z-10 drop-shadow-md" />
						</div>
					{:else}
						<!-- Fallback placeholder -->
						<div class="w-full h-32 bg-muted/50 flex items-center justify-center">
							<span class="text-muted-foreground text-sm">Preview unavailable</span>
						</div>
					{/if}
					
					<div class="p-6 flex flex-col space-y-5">
						{#if resultData.title}
							<h3 class="font-semibold leading-snug tracking-tight text-left line-clamp-2 text-foreground/90">{resultData.title}</h3>
						{/if}
						<div class="relative w-full group">
							<Input class="w-full rounded-lg border-primary/20 bg-primary/5 p-3 pr-24 font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/50 transition-colors" value={purifiedLink} readonly />
							<Button
								variant={copyButtonVariant}
								size="sm"
								class="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 font-medium"
								on:click={copyToClipboard}
							>
								{copyButtonText}
							</Button>
						</div>
						
						<div class="flex space-x-3 pt-1">
							<Button 
								class="flex-1 font-semibold group border-0 shadow-sm transition-all hover:scale-[1.02]" 
								variant="default"
								on:click={() => window.open(purifiedLink, '_blank', 'noopener,noreferrer')}
							>
								Open Link
								<ExternalLink class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Button>
							<Button 
								class="flex-1 font-semibold shadow-sm transition-all hover:scale-[1.02]" 
								variant="secondary"
								on:click={resetForm}
							>
								Purify Another
							</Button>
						</div>
					</div>
				</div>
			{:else}
				<form transition:fade="{{ duration: 200 }}" class="w-full flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
					<div class="relative w-full shadow-sm rounded-lg group">
						<Input
							class="w-full rounded-lg border p-4 text-base transition-colors hover:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50"
							bind:value={link}
							type="text"
							placeholder="Paste TikTok link here..."
						/>
					</div>

					{#if link && !isValidLink(link)}
						<p transition:slide class="text-sm text-destructive text-left pl-2">Please enter a valid TikTok URL.</p>
					{/if}

					<Button
						type="button"
						class="w-full py-6 text-lg font-semibold shadow-sm transition-all hover:scale-[1.01]"
						variant="secondary"
						on:click={pasteFromClipboard}
					>
						Tap to Paste Link
					</Button>
				</form>
			{/if}
		</div>

		<!-- Settings below multi-state area -->
		<div
			data-aos="fade-up"
			data-aos-delay="250"
			class="flex w-full items-center justify-between space-x-4 rounded-xl border bg-card/50 p-4 shadow-sm mt-8 transition-colors hover:bg-card/80"
		>
			<div class="flex flex-col items-start justify-center space-y-1.5 text-left">
				<Label for="direct-link" class="text-base font-medium leading-none cursor-pointer">Open automatically</Label>
				<Label for="direct-link" class="text-sm text-muted-foreground cursor-pointer">
					Instantly open purified link in new tab
				</Label>
			</div>
			<Switch id="direct-link" bind:checked={directLink} on:click={handleLocalStorage} />
		</div>
	</div>
</section>