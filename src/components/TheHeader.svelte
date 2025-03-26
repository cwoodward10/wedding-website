<script lang="ts">
	import { onMount } from 'svelte';
    import HamburgerMenu from "./generic/HamburgerMenu.svelte";

    export let page: 'home' | 'default' = 'default';
    const hamburgerColor = page === 'home' ? 'var(--color-white)' : 'var(--color-green)';

    const HEIGHT_HERO = 20;

    const ROUTES: {name: string, route: string, external?: boolean}[] = [
        {
            name: 'Wedding',
            route: '/wedding-info'
        },
        {
            name: 'Travel',
            route: '/travel-info'
        },
        {
            name: 'Gallery',
            route: '/gallery'
        },{
            name: 'Registry',
            route: 'https://www.zola.com/registry/natalieandchriswedding2025',
            external: true
        }
    ]

    let hideHeader = true;
    let prevY = 0;
    let scrollY: number = 0;
    $: {
        if (scrollY < HEIGHT_HERO) {
            hideHeader = true;
        } else {
            hideHeader = true && (prevY > scrollY)
        }
        prevY = scrollY;
    }

    let isCurrent: (path: string) => boolean;
    onMount(() => {
        isCurrent = (path: string) => {
            return location.pathname === path;
        }
    })
</script>

<svelte:window bind:scrollY={scrollY} />
<header id="top-header" class:shadow={scrollY > 5} class={page} class:hide={!hideHeader}>
    <div id="header-content" >
        <a class="logo-container" href="/">
            <span class="inner">
                Natalie & Chris
            </span>
        </a>
        <nav class="hamburger-container">
            <HamburgerMenu color={hamburgerColor}>
                {#each ROUTES as route}
                <li class="ham-route">
                    <a 
                        href={route.route} 
                        target={route.external ? "_blank" : ""}
                        data-astro-prefetch
                        class:current={isCurrent ? isCurrent(route.route) : false}
                    >
                        {route.name}
                    </a>
                </li>
                {/each}
            </HamburgerMenu>
        </nav>
        <nav class="link-menu-container">
            {#each ROUTES as route}
            <li class="nav-route">
                <a 
                    href={route.route} 
                    class={route.external ? "external" : ""} 
                    target={route.external ? "_blank" : ""} 
                    data-astro-prefetch
                >
                    <span class="inner">
                        {route.name}
                    </span>
                </a>
            </li>
            {/each}
        </nav>
    </div>
</header>

<style lang="scss">
@use '@styles/media.scss' as Media;

#top-header {

    z-index: 100;

    width: 100vw;
    position: sticky;
    top: 0;

    padding: 0.75rem var(--space-line);
    @include Media.at('small') {
        padding: 1.3rem var(--space-line);
    }
    
    display: flex;

    background-color: var(--color-white);

    --color-text: var(--color-green);
    &.home {
        --color-text: var(--color-white);

        position: fixed;
        top: 0;
        left: 0;

        background-color: transparent;

        .link-menu-container a {
            &::before, &::after {
                background-color: var(--color-white);
            }
        }
    }

    transform: translateY(0%);
    transition: transform 300ms ease-in-out;

    &.hide {
        transform: translateY(-100%);
    }

    &.shadow {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    }

    @include Media.until('medium') {
        position: fixed;
        top: 0;
        left: 0;
    }

    @include Media.at('medium') {
        padding: 1rem var(--space-small);

    }

    &.home li a.external .inner::after {
        filter: brightness(100);
    }
}

#header-content {
    margin: 0 auto;
    height: 2rem;
    width: 100%;

    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    
    a {
        color: var(--color-text);
        font-family: var(--font-title);
        font-size: 1.5rem;
        line-height: 125%;
        text-decoration: none;
        font-style: normal;
    }

    @include Media.until('medium') {
        justify-content: space-between;
    }

    .link-menu-container {
        display: none;
        content-visibility: hidden;
        align-items: center;
    }
    @include Media.at('medium') {
        .hamburger-container {
            display: none;
            content-visibility: hidden;
        }
        .link-menu-container {
            content-visibility: visible;
            display: inline-flex;
            gap: 1.5rem;
        }
    }

    li {
        list-style-type: none;
        margin: 0;
    }

    li::marker {
        content: none;
    }

    li.ham-route {
        text-align: center;

        a {
            position: relative;
            font-size: 3rem;
            color: white;

            &.current {
                &::after, &::before {
                    content: "";
                    display: block;
                    background-image: url('../assets/images/mb-menu-flowers.png');
                    background-size: contain;

                    position: absolute;
                    top: 50%;
                    translate: 0 -50%;
                    width: 100px;
                    height: 67px;
                }
                &::before {
                    right: calc(100% + 1rem);
                    transform: scaleX(-1);
                }
                &::after {
                    left: calc(100% + 1rem);
                }
            }
        }
    }
}

</style>