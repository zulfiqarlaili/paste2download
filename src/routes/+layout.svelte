<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import AOS from 'aos';
	import { onMount } from 'svelte';
	import { version } from '$app/environment';
	import { Toaster } from '$lib/components/ui/sonner';
	import { page } from '$app/stores';
	import { Home, Headset } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { toast } from 'svelte-sonner';
	import { app, getLoginUser, getUser, logout } from '$lib/firebase';
	import { type User } from 'firebase/auth';
	import * as Menubar from '$lib/components/ui/menubar/index.js';

	let user: User | null;
	$: user;

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state == 'installed') {
					if (confirm('New update available! Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	const handleSupport = () => {
		let isOpen = (window as any).$chatwoot.isOpen
		console.log(isOpen);
		(window as any).$chatwoot.toggle(isOpen ? 'close' : 'open');
	};

	const handleLogout = () => {
		toast.message('You sure want to log out?', {
			position: 'top-center',
			duration: 3000,
			action: {
				label: 'Yes',
				onClick: () => {
					logout();
					toast.success('Logged out!', {
						position: 'top-center'
					});
				}
			}
		});
	};

	getUser((data) => {
		user = data || null;
	});

	onMount(() => {
		AOS.init({
			duration: 800, // controls the duration of the animation (in ms)
			once: true,    // whether animation should happen only once - while scrolling down
		});
		user = getLoginUser();
		if (user) goto('/paste-link');
		if (localStorage.getItem('isFirstTime') === 'false') {
			//goto('/paste-link');
		} else {
			if (!window.matchMedia('(display-mode: standalone)').matches) {
				toast.message(`Install our site on your mobile device`, {
					position: 'top-center',
					duration: 7000,
					action: {
						label: 'Install',
						onClick: () => {
							goto('/install');
						}
					}
				});
			}
			localStorage.setItem('isFirstTime', 'false');
		}
		detectSWUpdate();
	});
</script>

<nav>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 pt-1">
		<!-- <Button on:click={() => goto('/')} variant="ghost" size="icon">
			<Home class="h-5 w-5" />
		</Button> -->
		<Menubar.Root class="border-none">
			<Menubar.Menu>
				<Menubar.Trigger>
					<Home class="h-5 w-5" />
				</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item on:click={() => goto('/')}>Home</Menubar.Item>
					<Menubar.Item on:click={() => goto('/purify')}>Purify</Menubar.Item>
					<Menubar.Item on:click={() => goto('/install')}>Install App</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
		<div class="flex items-center rtl:space-x-reverse">
			<Button on:click={handleSupport} variant="ghost" size="icon">
				<Headset class="h-5 w-5" />
			</Button>
			<div>
				<Button
					on:click={toggleMode}
					variant="ghost"
					size="icon"
					data-umami-event="Dark mode button"
				>
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
				</Button>
			</div>
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]}>
							<Avatar.Root class="relative h-[1.5rem] w-[1.5rem]">
								<Avatar.Image src={user.photoURL} alt="@shadcn" />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>{user.displayName}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={handleLogout}>
							<span>Logout</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</nav>

<ModeWatcher />
<Toaster />
<slot />
{#if $page.url.pathname === '/'}
	<small class="text-sm text-muted-foreground">v{version}</small>
{/if}