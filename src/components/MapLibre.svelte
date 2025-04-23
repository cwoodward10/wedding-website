<script lang="ts">
    import maplibregl from 'maplibre-gl';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import { onMount } from 'svelte';

    import mapStyle from '@assets/basic.json';
    
    let mapEl: HTMLDivElement;
    onMount(() => {
        const map = new maplibregl.Map({
            container: mapEl,
            style: mapStyle,
            center: [-87.69400686467146, 41.95473253319672],
            zoom: 14,
            attributionControl: false
        })

        const marker = new maplibregl.Marker({ color: '#0B532A'})
            .setLngLat([-87.69400686467146, 41.95473253319672])
            .addTo(map);
    })
</script>

<div bind:this={mapEl} class="map" />

<style lang="scss">
    .map {
        width: 100%;
        aspect-ratio: 1 / 1;

        border-radius: 0.5rem;
        overflow: hidden;
        filter: drop-shadow(2px 3px 4px #0000001a);
    }
</style>