<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let title: string;
    export let startOpen = false;
    export let preventCloseOnClick = false;
    
    const dispatch = createEventDispatcher();

    let detailsEl: HTMLDetailsElement;
    let summaryEl: HTMLElement;
    let contentEl: HTMLDivElement;
    let isOpen: boolean = startOpen;

    let isClosing: boolean = false;
    let isExpanding: boolean = false;
    let animation: Animation | null = null;

    const onAnimationFinish = (open: boolean) => {
        // Set the open attribute based on the parameter
        isOpen = open;
        // Clear the stored animation
        animation = null;
        // Reset isClosing & isExpanding
        isClosing = false;
        isExpanding = false;
        // Remove the overflow hidden and the fixed height
        detailsEl.style.height = '';
    }

    function shrink() {
        // Set the element as "being closed"
        isClosing = true;

        // Store the current height of the element
        const startHeight = `${detailsEl.offsetHeight}px`;
        // Calculate the height of the summary
        const endHeight = `${summaryEl.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        animation = detailsEl.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            // If the duration is too slow or fast, you can change it here
            duration: 400,
            // You can also change the ease of the animation
            easing: 'ease-out'
        });

        // When the animation is complete, call onAnimationFinish()
        animation.onfinish = () => onAnimationFinish(false);
        // If the animation is cancelled, isClosing variable is set to false
        animation.oncancel = () => isClosing = false;
    }

    function open() {
        // Apply a fixed height on the element
        detailsEl.style.height = `${detailsEl.offsetHeight}px`;
        // Force the [open] attribute on the details element
        isOpen = true;
        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => expand());
    }

    function expand() {
        // Set the element as "being expanding"
        isExpanding = true;
        // Get the current fixed height of the element
        const startHeight = `${detailsEl.offsetHeight}px`;
        // Calculate the open height of the element (summary height + content height)
        const endHeight = `${summaryEl.offsetHeight + contentEl.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        animation = detailsEl.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight],
        }, {
            // If the duration is too slow of fast, you can change it here
            duration: 400,
            // You can also change the ease of the animation
            easing: 'ease-out'
        });
        // When the animation is complete, call onAnimationFinish()
        animation.onfinish = () => onAnimationFinish(true);
        // If the animation is cancelled, isExpanding variable is set to false
        animation.oncancel = () => isExpanding = false;
    }

    function handleToggle(e: Event) {
        // Add an overflow on the <details> to avoid content overflowing
        detailsEl.style.overflow = 'hidden';
        // Check if the element is being closed or is already closed
        if (isClosing || !isOpen) {
            open();
        // Check if the element is being openned or is already open
        } else if (isExpanding || isOpen) {
            shrink();
        }
    }

    const onClick = (e: Event) => {
        // Stop default behaviour from the browser
        e.preventDefault();
        
        if (!detailsEl) {
            return;
        }

        dispatch('click', open);


        if (
            !preventCloseOnClick ||
            (preventCloseOnClick && !isOpen)
        ) {
            handleToggle(e);
        }
    }

    export function Close() {
        detailsEl.style.overflow = 'hidden';
        shrink();
    }
</script>

<details 
    bind:this={detailsEl}
    data-title={title} 
    data-prevent-close={preventCloseOnClick}
    open={isOpen}
>
    <summary bind:this={summaryEl} on:click={onClick}>
        <div class="icon"/>{title}
    </summary>
    <div bind:this={contentEl} class="content">
        <slot></slot>
    </div>
</details>

<style lang="scss">
    details {
        cursor: pointer;
        
        --border-color: color-mix(in srgb, var(--color-green) 30%, transparent 80%);
        border-bottom: var(--border-color) 1px solid;
        
        &[open] {
            --border-color: color-mix(in srgb, var(--color-green) 70%, transparent 30%);

            &[data-prevent-close] {
                cursor: initial;
            }

            summary {
                border-bottom: var(--border-color) 1px solid;

                .icon:before, .icon:after {
                    rotate: 0deg;
                }
                .icon:after {
                    opacity: 0;
                }
            }
        }

        summary {
            display: inline-flex;
            align-items: center;
            gap: var(--space-tiny);

            width: 100%;

            padding: var(--space-tiny) 0.25rem;

            .icon {
                display: block;
                width: 1em;
                aspect-ratio: 1/1;
                position: relative;

                border: var(--color-green) 1px solid;
                border-radius: 100%;

                &:before, &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    translate: -50% -50%;

                    width: 80%;
                    height: 2px;
                    border-radius: 1px;
                    background-color: var(--color-green);
                    opacity: 1;
                    transition: all 500ms ease-out;
                }

                &:after {
                    rotate: 90deg;
                }
                &:before {
                    rotate: 180deg;
                }
            }
        }
    }

    details summary::marker {
        content: none;
    }
</style>