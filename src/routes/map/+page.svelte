<script lang="ts">
    import Header from "$lib/Header.svelte";
    import LeafletMap from "$lib/LeafletMap.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import { onMount } from "svelte";
    import { placemarkService } from "../../services/placemark-service";
    import { getMarkerLayer } from "../../services/placemark-utils";

    let map: LeafletMap;

    onMount(async () => {
        placemarkService.checkPageRefresh();
        const placemarks = await placemarkService.getPlacemarks();
        const placemarkMarkerLayer = getMarkerLayer(placemarks);
        map.populateLayer(placemarkMarkerLayer);
    });
</script>

<Header>
    <MainNavigator />
</Header>

<LeafletMap bind:this={map} />
