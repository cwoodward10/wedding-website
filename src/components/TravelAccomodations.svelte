<script lang="ts">
    import TheBean from '@assets/images/chicago/thebean.jpg';
    import LincolnPark from '@assets/images/chicago/lincolnpark.jpg';
    import WickerPark from '@assets/images/chicago/wickerpark.jpg';
    import QuietYard from '@assets/images/chicago/quietyard.jpg';

	import Accordion from './generic/Accordion.svelte';

    type Area = {
        name: string,
        tag: string,
        image: {
            src: any,
            alt: string
        }
        neighborhoods: Record<string, string>
    }
    const cityRegions: Area[] = [
        {
            name: 'Downtown',
            tag: 'Sites, Shopping, and Tourism',
            image: {
                src: TheBean,
                alt: 'The Bean. Photo by Antonio Gabola on Unsplash'
            },
            neighborhoods: {
                'The Loop': 'The heart of Chicago, known for its iconic architecture and cultural landmarks.',
                'River North': 'A vibrant area with art galleries, trendy restaurants, and nightlife.',
                'Streeterville': 'Home to Navy Pier and stunning lakefront views.'
            }
        },
        {
            name: 'North Side',
            tag: 'Upscale Dining and Proximity to Lake',
            image: {
                src: LincolnPark,
                alt: 'Lincoln Park. Photo by Alex Sawyer on Unsplash'
            },
            neighborhoods: {
                'Lakeview': 'A lively neighborhood with bars, restaurants, and the famous Wrigley Field.',
                'Lincoln Park': 'Offers a mix of quiet streets, fine dining, and nightlife. It also has the beautiful Lincoln Park Zoo.',
                'Andersonville': 'Known for its diverse community and eclectic mix of shops and eateries.'
            }
        },
        {
            name: 'Northwest Side',
            tag: 'Community and Proximity to Venue',
            image: {
                src: QuietYard,
                alt: 'Photo by Nesh Lonzoy on Unsplash'
            },
            neighborhoods: {
                'North Center': 'A family-friendly area with parks and local breweries. (Closest to venue!)',
                'Lincoln Park': 'Quiet neighborhood featuring charming boutiques, cafes, and a strong sense of community.',
                'Albany Park': 'A culturally rich neighborhood with diverse, and really tasty, dining options. (Where we live now!)'
            }
        },
        {
            name: 'The West Side',
            tag: 'A Mix of Trends and History',
            image: {
                src: WickerPark,
                alt: 'Photo by Dominique Caron on Unsplash'
            },
            neighborhoods: {
                'West Town': 'A gentrifying area with a mix of historic homes, local shops, and modern amenities.',
                'Wicker Park': 'Known for its artistic vibe, trendy shops, and vibrant nightlife. (Where we lived before!)',
                'Logan Square': 'Offers a blend of historic charm and contemporary culture. Hipsters love it here.'
            }
        }
    ]
    
    const regionsComponents: (null | Accordion)[] = [ null, null, null, null];
    
    let openRegion: number = 0;
    const handleToggle = (e: CustomEvent, index: number) => {
        if (e.detail) {
            regionsComponents.forEach((r: Accordion | null, i: number) => {
                index !== i && r?.Close();
            })
            openRegion = index;
        }
    }

    let windowWidth;
    $: preventCloseOnClick = windowWidth > 739;
</script>

<svelte:window bind:outerWidth={windowWidth} />

<div class="travel-accomodations">
    <div class="accordions container">
        {#each cityRegions as region, i}
        <Accordion 
            bind:this={regionsComponents[i]}
            title={region.name} 
            startOpen={i === 0}
            {preventCloseOnClick}
            on:click={(e) => handleToggle(e, i)}
        >
            <div class="city-region">
                <div>
                    <p class="tag">Best for:</p>
                    <p>{region.tag}</p>
                </div>
                <div>
                    <p class="tag">Consider staying in:</p>
                    <ul>
                        {#each Object.keys(region.neighborhoods) as neighborhood }
                        <li>
                            <p class="title">{neighborhood}</p>
                            <p>{region.neighborhoods[neighborhood]}</p>
                        </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </Accordion>
        {/each}
    </div>

    <div class="images container">
        {#each cityRegions as region, i}
        {@const image = region.image}
        <div 
            class="image" 
            class:active={i === openRegion }
        >
            <img src={image.src.src} alt={image.alt}/>
        </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @use '@styles/media.scss' as Media;

    .travel-accomodations {
        height: 100%;
        display: flex;
        flex-direction: column;

        @include Media.at('medium') {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-small)
        }
        @include Media.at('large') {
            gap: var(--space-medium);
        }

        .accordions.container {
            gap: var(--space-line);

            :global(details:last-child) {
                border-bottom: none;
            }

            :global(summary) {
                font-size: 1.5rem;
                color: var(--color-green);
            }
            :global(details:not([open]) summary) {
                opacity: 40%;
                color: var(--color-black)
            }

            .city-region {
                display: flex;
                flex-direction: column;
                gap: var(--space-line);

                padding: var(--space-line) 0;

                &>div {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;

                    ul {
                        margin: 0;
                    }
                }
            }
        }

        .images.container {
            display: none;
            content-visibility: hidden;

            @include Media.at('medium') {
                content-visibility: auto;
                width: 100%;
                height: fit-content;
                overflow: hidden;

                display: grid;
                grid-template-columns: 1fr;
                gap: var(--space-tiny);

                box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
            }
            @include Media.at('large') {
                gap: var(--space-line);
            }

            .image {
                width: 100%;
                aspect-ratio: 5/7;
                grid-area: 1/1;
                overflow: hidden;

                border-radius: 2px;

                transition: opacity 500ms ease-out;

                &:not(.active) {
                    opacity: 0;
                    pointer-events: none;
                }

                img {
                    min-height: 100%;
                    min-width: 100%;
                    width: auto;
                    height: auto;

                    filter: grayscale(0.25);
                }
            }
        }
    }
</style>