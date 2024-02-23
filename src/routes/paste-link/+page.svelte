<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ClipboardPaste } from 'lucide-svelte';

	let link: string = '';

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
		toast.loading('Downloading...',{
            description: 'Please wait',
            position: 'top-right'
        });
	};
</script>

<div class="flex h-screen items-center justify-center">
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
		<Button disabled={!isValidLink(link)} type="submit">Download</Button>
	</form>
</div>
