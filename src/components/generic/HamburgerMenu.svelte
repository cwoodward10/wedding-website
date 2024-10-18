<script lang="ts">
import { onMount } from "svelte";

export let color: string = 'var(--color-primary, white)';

let showMenu = false;

const transitionDuration = 300;
$: transitionDelay = showMenu ? `0ms, ${transitionDuration - 50}ms` : `${transitionDuration - 50}ms, 0ms`;

$: cssVarStyles = `
    --ham-color:${color};
    --ham-transition-delay:${transitionDelay};
    --ham-transition-duration:${transitionDuration}ms;
`;

onMount(() => {
    const menuListItems = document.querySelectorAll('#menu-container li');

    if (menuListItems.length > 0) {
        menuListItems.forEach((li: any, i) => {
            li.style.cssText = `--li-animation-order: ${i}`;
            li.classList.add('ham-item');
        })
    }
})
</script>

<button 
    id="hamburger" 
    aria-label="menu"
    style="{cssVarStyles}"
    class:open={showMenu}
    on:click={() => showMenu = !showMenu}
>
    <div id="one" class="menu-bar" />
    <div id="two" class="menu-bar" />
    <div id="three" class="menu-bar" />
</button>

<!-- pop up menu -->
<div 
    id="menu-container"
    class:show-menu={showMenu}
    style="{cssVarStyles}" 
>
    <menu>
        <ol>
            <slot>
                <li>
                    <p>Item 1</p>
                </li>
                <li>
                    <p>Item 2</p>
                </li>
                <li>
                    <p>Item 3</p>
                </li>
            </slot>
        </ol>
    </menu>
</div>

<style lang="scss">
#hamburger {
    --height: 30px;
    height: var(--height);
    aspect-ratio: 3 / 2;
    border-color: var(--ham-color, white);
    border-width: 2px;
    border-radius: 20px;

    z-index: 50;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 0.5em;

    background-color: transparent;
    border: var(--ham-color) 2px solid;
    transition: border-color 300ms ease-out;
    
    .menu-bar {
        --offset: calc(var(--height) / 5);
        --width: calc(100% - 1rem);

        height: 2px;
        width: 100%;
        background-color: var(--ham-color);
        border-radius: 2px;

        position: absolute;
        top: 50%;
        left: 50%;

        &#one {
            width: var(--width);
            translate: -50% calc(-50% - var(--offset));
            rotate: 0deg;
    
            transition: translate, rotate;
            transition-duration: var(--ham-transition-duration);
            transition-delay: var(--ham-transition-delay);
        }
        &#two {
            scale: 1 1;
            width: var(--width);
            translate: -50% -50%;
            transition: scale;
            transition-duration: var(--ham-transition-duration);
            transition-delay: var(--ham-transition-delay);
        }
        &#three {
            width: var(--width);
            translate: -50% calc(-50% + var(--offset));
            rotate: 0deg;
            
            transition: translate, rotate;
            transition-duration: var(--ham-transition-duration);
            transition-delay: var(--ham-transition-delay);
        }
    }

    &.open {
        border-color: var(--color-offwhite);

        .menu-bar {
            background-color: var(--color-white);
        }

        #one {
            rotate: 45deg;
            translate: -50% -50%;
        }
        #two {
            scale: 0 1;
        }
        #three {
            rotate: -45deg;
            translate: -50% -50%;
        }
    }
}

:global(html body:has(#menu-container.show-menu)) {
    overflow: hidden;

    body {
        pointer-events: none;
    }
}
#menu-container {
    display: flex;
    @supports (content-visibility: auto) {
        content-visibility: auto;
    }

    z-index: 40;
    position: fixed;
    top: 0;
    right: 0;

    width: 0;
    height: 0;

    overflow: hidden;

    flex-grow: 0;

    border-bottom-left-radius: 100%;

    background-color: color-mix(in srgb, transparent 10%, var(--color-green) 80%);
    backdrop-filter: blur(10px);

    transition-property: display, height, width, border-radius;
    transition-duration: var(--ham-transition-duration, 300ms);
    transition-timing-function: ease-in-out;

    @supports (transition-behavior: allow-discrete) {
        display: none;
        transition-behavior: allow-discrete;
    }

    &.show-menu {
        display: flex;
        width: 100dvw;
        height: 100dvh;
        border-radius: 0px;
    }

    menu {
        width: 100dvw;
        height: 100dvh;
        
        padding: 3em 0.5em;

        display: flex;
        flex-direction: column;

        ol {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1em;

            margin: 0;
            padding: 0;
        }

    }
    :global(li) {
        opacity: 0;
        transition: opacity 400ms ease-out;
    }

    &.show-menu :global(li) {
        opacity: 0%;

        animation-name: li-in;
        animation-fill-mode: forwards;
        animation-direction: normal;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(.88,-0.03,.49,1.73);
        animation-duration: 500ms;
        animation-delay: calc((var(--ham-transition-duration) / 2) + (var(--li-animation-order) * 80ms));
    }
}

@keyframes li-in {
    from {
        translate: 0 1em;
        opacity: 0%;
    }

    to {
        translate: 0px 0px;
        opacity: 100%;
    }
}

:global(html.reduce-motion) #menu-container {
    border-bottom-left-radius: 0;
    opacity: 0;

    transition-property: opacity;
}
:global(html.reduce-motion) #menu-container.show-menu {
    opacity: 1;
}
:global(html.reduce-motion) #menu-container.show-menu :global(li) {
    animation: none;
    opacity: 1;
}
@media (prefers-reduced-motion) {
    #menu-container {
        width: 100%;
        height: 100%;
        border-bottom-left-radius: 0;
        opacity: 0;

        transition-property: opacity;
    }
    #menu-container.show-menu {
        opacity: 1;
    }
    #menu-container.show-menu :global(li) {
        animation: none;
    }
}
</style>