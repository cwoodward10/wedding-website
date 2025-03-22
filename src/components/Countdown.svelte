<script lang=ts>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

const countDownDate = new Date("Sep 20, 2025 16:30:00-06:00").getTime();

let countdown: number;

const days = writable(0);
const hours = writable(0)
const minutes = writable(0);
const seconds = writable(0);

$: counts = [
    {
        value: $days,
        title: "days"
    },
    {
        value: $hours,
        title: "hours"
    },
    {
        value: $minutes,
        title: "minutes"
    },
    {
        value: $seconds,
        title: "seconds"
    },
]

const handleCountdown = () => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    $days = Math.floor(distance / (1000 * 60 * 60 * 24));
    $hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    $minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    $seconds = Math.floor((distance % (1000 * 60)) / 1000);
}

handleCountdown();
onMount(() => {
    countdown = setInterval(() => handleCountdown(), 1000);

    return () => {
        clearInterval(countdown);
    }
})
</script>

<div class="countdown">
    {#each counts as count}
    <div class="tile">
        <p class="number">{count.value}</p>
        <p class="title">{count.title}</p>
    </div>
    {/each}
</div>

<style lang="scss">
    @use '@styles/media.scss' as Media;

    .countdown {
        --font-size: 3.5rem;
        @include Media.at('medium') {
            --font-size: 4.5rem;
        }
        @include Media.at('large') {
            --font-size: 5.5rem;
        }
        width: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        @include Media.at('medium') {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
        }

        &>* {
            color: var(--color-offwhite);
        }

        .tile {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            justify-content: center;
            align-items: center;

            aspect-ratio: 5 / 6;

            padding: 1rem;
            border-radius: 0.25rem;

            background-color: color-mix(in srgb, transparent 80%, var(--color-orange) 10%);
            backdrop-filter: blur(4px);
            filter: drop-shadow(2px 3px 4px #0000001a);

            p {
                margin: 0;
                line-height: 1.2;
                color: var(--color-white);
            }
            
            .number {
                font-family: var(--font-deco);
                font-size: var(--font-size);
            }

            .title {
                text-transform: uppercase;
                font-size: 1.5rem;
            }
        }
    }
</style>