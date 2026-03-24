<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste, Music, Video, RefreshCw } from 'lucide-svelte';
	import {
		getAudioBlob,
		getVideoBlob,
		getVideoHDBlob,
		getVideoInfo,
		postVideoToSocialMedia
	} from '$lib/api';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { onMount } from 'svelte';
	import { urlHero } from '$lib/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { type User } from 'firebase/auth';
	import { getUser, signInWithTwitter } from '$lib/firebase';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { mediaQuery } from 'svelte-legos';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { fade, slide } from 'svelte/transition';

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;
	let infoDialog = false;
	let link: string = '';
	let submittedLink: string = '';
	let thumbNail: string = '';
	let title: string = '';
	let downloadUrl: string = '';
	let isLoading: boolean = false;
	let isLoadingVideo: boolean = false;
	let isLoadingVideoHD: boolean = false;
	let isLoadingAudio: boolean = false;
	let isShowThumbnail: boolean = false;
	let user: User | null;
	let caption: string = '';
	let video_id: string = '';

	$: link, sanitizeLink();
	$: if (isValidLink(link) && !isLoading && !thumbNail && !title) {
		handleSubmit();
	}

	const isValidLink = (url: string): boolean => {
		const linkRegex = /https?:\/\/\S+/;
		return linkRegex.test(url);
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

	const handleLinkValidation = () => {
		if (!isValidLink(link) && link.trim() !== '') {
			toast.error('Invalid link', {
				description: 'Please enter a valid link',
				position: 'top-right'
			});
		}
	};

	const sanitizeLink = () => {
		if (link) {
			link = link.replace('Enjoy this post in TikTok:', '').trim();
		}
	};

	const resetForm = () => {
		link = '';
		submittedLink = '';
		thumbNail = '';
		title = '';
		downloadUrl = '';
		video_id = '';
		isShowThumbnail = false;
	};

	const handleSubmit = () => {
		if (!isValidLink(link)) {
			handleLinkValidation();
			return;
		}

		toast.loading('Getting video info...', {
			description: 'Please wait',
			position: 'top-right',
			duration: 2000
		});
		isLoading = true;
		thumbNail = '';
		title = '';
		downloadUrl = '';
		video_id = '';
		submittedLink = link;

		getVideoInfo(link)
			.then(async (res: any) => {
				isLoading = false;
				thumbNail = res.thumbnail;
				title = res.title;
				downloadUrl = res.download_url;
				video_id = res.id;
				link = ''; // clear input so user sees empty on next visit
				isShowThumbnail = (await fetch(res.download_url)).status !== 200;
			})
			.catch((err) => {
				isLoading = false;
				console.log(err);
				toast.error('Failed: ' + err.message, {
					position: 'top-right'
				});
			});
	};

	const handleDownloadMedia = async (format: 'video' | 'audio' | 'videoHD') => {
		const downloadName =
			format === 'video' ? `${title}.mp4` : format === 'audio' ? `${title}.mp3` : `${title}.mp4`;

		handleLoadingButton(format, true);
		try {
			const blob =
				format === 'video'
					? await getVideoBlob(submittedLink)
					: format === 'audio'
						? await getAudioBlob(submittedLink)
						: await getVideoHDBlob(video_id);
			const blobUrl = URL.createObjectURL(blob);

			const data: HTMLAnchorElement = document.createElement('a');
			data.href = blobUrl;
			data.download = downloadName;
			data.style.display = 'none';

			document.body.appendChild(data);
			data.click();

			document.body.removeChild(data);
			URL.revokeObjectURL(blobUrl);
			toast.success(`Downloaded successfully`, { position: 'top-right' });
			handleLoadingButton(format, false);
		} catch (err) {
			toast.error('Failed: ' + (err as Error).message, { position: 'top-right' });
			handleLoadingButton(format, false);
		}
	};

	const handleLoadingButton = (format: string, isLoading: boolean) => {
		if (format === 'video') {
			isLoadingVideo = isLoading;
		} else if (format === 'audio') {
			isLoadingAudio = isLoading;
		} else if (format === 'videoHD') {
			isLoadingVideoHD = isLoading;
		}
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
		open = false;
		thumbNail = '';
		infoDialog = true;
		setTimeout(() => (infoDialog = false), 5000);
		postVideoToSocialMedia(submittedLink, caption)
			.then(() => {
				toast.success('Your video has been successfully posted on social media!', {
					position: 'top-right'
				});
			})
			.catch((error) => {
				toast.error('Failed: ' + error.message, {
					position: 'top-right'
				});
			})
			.finally(() => {
				caption = '';
			});
	};

	const handleKeyPress = () => {
		const anchor = document.getElementById('bottom-anchor');
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth' });
		}
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

<div class="flex flex-col items-center justify-center p-4 pt-16 sm:p-6 lg:p-8">
	<h1 data-aos="fade-up" data-aos-delay="100" class="mb-4 mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
		Download videos from any website
	</h1>
	<p data-aos="fade-up" data-aos-delay="100" class="mb-12 max-w-2xl text-center text-gray-500 dark:text-gray-400 text-lg">
		Paste your video URL below to quickly get download options for various platforms.
	</p>

	<div data-aos="fade-up" data-aos-delay="200" class="w-full max-w-md flex flex-col items-center">
		<!-- Multi-state absolute container -->
		<div class="w-full relative min-h-[160px]">
			{#if isLoading}
				<div transition:fade="{{ duration: 200 }}" class="w-full flex flex-col items-center justify-center space-y-4 p-8 border rounded-xl bg-muted/20 backdrop-blur-sm shadow-sm ring-1 ring-border/50 min-h-[200px]">
					<Loader2 class="h-10 w-10 animate-spin text-primary mx-auto mb-2" />
					<p class="text-sm font-medium text-muted-foreground animate-pulse">Extracting media info...</p>
					<div class="w-full space-y-3 mt-4">
						<Skeleton class="h-4 w-3/4 mx-auto" />
						<Skeleton class="h-4 w-1/2 mx-auto" />
					</div>
				</div>
			{:else if title || thumbNail}
				<div transition:fade="{{ duration: 300 }}" class="w-full flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg ring-1 ring-border/50">
					{#if thumbNail}
						<div class="relative w-full aspect-video bg-black/5 overflow-hidden">
							<img src={thumbNail} alt="" aria-hidden="true" class="object-cover w-full h-full blur-2xl scale-110 opacity-40 absolute inset-0 mix-blend-overlay dark:mix-blend-lighten" />
							<img src={thumbNail} alt="Video thumbnail" class="object-contain w-full h-full relative z-10 drop-shadow-md" on:error={() => { isShowThumbnail = false; }} />
						</div>
					{:else if downloadUrl && !isShowThumbnail}
						<div class="relative w-full aspect-video bg-black flex items-center justify-center">
							<video class="w-full h-full object-contain" controls src={downloadUrl}><track kind="captions" /></video>
						</div>
					{/if}

					<div class="p-6 flex flex-col space-y-5">
						{#if title}
							<p class="text-center text-lg font-semibold leading-snug text-foreground/90 line-clamp-2">{title}</p>
						{/if}

						<div class="grid gap-3">
							<Button
								data-umami-event="Download button"
								class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]"
								disabled={isLoadingVideo}
								on:click={() => handleDownloadMedia('video')}
							>
								{#if isLoadingVideo}
									<Loader2 class="mr-2 h-5 w-5 animate-spin" />
								{:else}
									<span>Download video</span>
									<Video class="ml-2 h-5 w-5" />
								{/if}
							</Button>
							{#if video_id}
								<Button
									data-umami-event="Download HD button"
									class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]"
									disabled={isLoadingVideoHD}
									on:click={() => handleDownloadMedia('videoHD')}
								>
									{#if isLoadingVideoHD}
										<Loader2 class="mr-2 h-5 w-5 animate-spin" />
									{:else}
										<span>Download HD video</span>
										<Video class="ml-2 h-5 w-5" />
									{/if}
								</Button>
							{/if}
							<Separator class="my-1" />
							<Button
								data-umami-event="Download audio button"
								class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]"
								disabled={isLoadingAudio}
								on:click={() => handleDownloadMedia('audio')}
							>
								{#if isLoadingAudio}
									<Loader2 class="mr-2 h-5 w-5 animate-spin" />
								{:else}
									<span>Download audio</span>
									<Music class="ml-2 h-5 w-5" />
								{/if}
							</Button>

							{#if user}
								{#if $isDesktop}
									<Dialog.Root bind:open>
										<Dialog.Trigger asChild let:builder>
											<Button variant="secondary" class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]" builders={[builder]}>
												<span>Post to X</span>
											</Button>
										</Dialog.Trigger>
										<Dialog.Content class="sm:max-w-[425px]">
											<form class="grid items-start gap-4 px-4">
												<Textarea
													bind:value={caption}
													placeholder="Video caption is optional..."
													class="resize-none"
													data-characters-left={Math.max(0, 280 - (caption ? caption.length : 0))}
												/>
												<p
													class={`text-right text-sm text-gray-500 dark:text-gray-400 ${caption && caption.length > 280 ? 'text-red-500' : ''} ${caption && caption.length > 280 ? 'dark:text-red-500' : ''}`}
												>
													{280 - (caption ? caption.length : 0)}
													{caption && caption.length > 280
														? 'characters left (too long)'
														: 'characters left'}
												</p>
												<Button
													data-umami-event="Social post button"
													type="submit"
													disabled={caption ? caption.length > 280 : false}
													on:click={handlePostSocialMedia}
												>
													<span>Post</span>
												</Button>
												<Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
											</form>
										</Dialog.Content>
									</Dialog.Root>
								{:else}
									<Drawer.Root bind:open>
										<Drawer.Trigger asChild let:builder>
											<Button variant="secondary" class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]" builders={[builder]}>
												<span>Post to X</span>
											</Button>
										</Drawer.Trigger>
										<Drawer.Content>
											<form class="grid items-start gap-4 px-4">
												<Textarea
													bind:value={caption}
													placeholder="Video caption is optional..."
													class="resize-none"
													data-characters-left={Math.max(0, 280 - (caption ? caption.length : 0))}
													on:keydown={handleKeyPress}
												/>
												<p
													class={`text-right text-sm text-gray-500 dark:text-gray-400 ${caption && caption.length > 280 ? 'text-red-500' : ''} ${caption && caption.length > 280 ? 'dark:text-red-500' : ''}`}
												>
													{280 - (caption ? caption.length : 0)}
													{caption && caption.length > 280
														? 'characters left (too long)'
														: 'characters left'}
												</p>
												<Button
													data-umami-event="Social post button"
													type="submit"
													disabled={caption ? caption.length > 280 : false}
													on:click={handlePostSocialMedia}
												>
													<span>Post</span>
												</Button>
											</form>
											<Drawer.Footer class="pt-2">
												<Drawer.Close asChild let:builder>
													<Button variant="outline" builders={[builder]}>Cancel</Button>
												</Drawer.Close>
											</Drawer.Footer>
										</Drawer.Content>
									</Drawer.Root>
									<div id="bottom-anchor" />
								{/if}
							{:else}
								<Dialog.Root>
									<Dialog.Trigger class="block w-full">
										<Button
											data-umami-event="Social login button"
											variant="secondary"
											class="w-full py-3 text-base shadow-sm transition-all hover:scale-[1.01]"
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
							
							<Separator class="my-1" />
							<Button 
								variant="outline" 
								class="w-full py-3 text-base font-semibold shadow-sm transition-all hover:bg-secondary hover:scale-[1.01]"
								on:click={resetForm}
							>
								<RefreshCw class="mr-2 h-4 w-4" />
								Get Another Video
							</Button>
						</div>
					</div>
				</div>
			{:else}
				<form transition:fade="{{ duration: 200 }}" class="w-full flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
					<div class="relative w-full shadow-sm rounded-lg group">
						<Input
							bind:value={link}
							type="text"
							placeholder="Paste video URL here..."
							class="w-full rounded-lg border p-4 text-base transition-colors hover:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50"
						/>
					</div>

					{#if link && !isValidLink(link)}
						<p transition:slide class="text-sm text-destructive text-left pl-2">Please enter a valid link.</p>
					{/if}

					<Button
						type="button"
						class="w-full py-6 text-lg font-semibold shadow-sm transition-all hover:scale-[1.01]"
						variant="secondary"
						on:click={pasteFromClipboard}
					>
						Tap to Paste Link
					</Button>

					<div class="pt-4 text-center">
						<Dialog.Root>
							<Dialog.Trigger>
								<p class="cursor-pointer text-sm text-primary hover:underline md:text-base">
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
					</div>
				</form>
			{/if}
		</div>
	</div>

	<AlertDialog.Root bind:open={infoDialog}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Your video is being processed</AlertDialog.Title>
				<AlertDialog.Description>
					Don't worry, we've got you covered. You can continue using our website while we handle the
					video processing in the background.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Action>OK</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>