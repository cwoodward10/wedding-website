<script lang="ts">
    import HamburgerMenu from "./generic/HamburgerMenu.svelte";

    export let page: 'home' | 'default' = 'default';
    const hamburgerColor = page === 'home' ? 'var(--color-white)' : 'var(--color-green)';

    const HEIGHT_HERO = 20;

    const ROUTES: {name: string, route: string}[] = [
        {
            name: 'Home',
            route: '/'
        },
        {
            name: 'Gallery',
            route: '/gallery'
        }
    ]

    let showSticky = true;
    let prevY = 0;
    let scrollY: number = 0;
    $: {
        if (scrollY < HEIGHT_HERO) {
            showSticky = true;
        } else {
            showSticky = true && (prevY > scrollY)
        }
        prevY = scrollY;
    }

    function isCurrent(path: string) {
        return location.pathname === path;
    }
</script>

<svelte:window bind:scrollY={scrollY} />
<header id="top-header" class:shadow={scrollY > 5} class={page} class:hide={!showSticky}>
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
                        data-astro-prefetch
                        class:current={isCurrent(route.route)}
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
                <a href={route.route} data-astro-prefetch>
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

        width: 100%;
        position: sticky;
        top: 0;
        
        display: flex;
        padding: 1.3rem var(--space-line);

        background-color: var(--color-white);

        --color-text: var(--color-green);
        &.home {
            --color-text: var(--color-white);

            position: fixed;
            top: 0;
            left: 0;

            background-color: transparent;

            #header-content {
                justify-content: flex-end;
                align-items: flex-end;

                .logo-container {
                    display: none;
                    content-visibility: hidden;
                }
            }
        }

        transform: translateY(0%);
        transition: transform 300ms ease-in-out;

        &.hide {
            transform: translateY(-100%);
        }

        @include Media.until('small') {
            position: fixed;
            top: 0;
            left: 0;

            background-color: transparent;
        }

        @include Media.at('medium') {
            padding: 1rem var(--space-small);

            &.shadow {
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
            }
        }
    }

    #header-content {
        margin: 0 auto;
        height: fit-content;
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
        }

        @include Media.until('medium') {
            justify-content: flex-end;
            align-items: flex-end;

            .logo-container {
                display: none;
                content-visibility: hidden;
            }
        }
    
        .link-menu-container {
            display: none;
            content-visibility: hidden;
            align-items: center;
        }
        @include Media.at('small') {
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