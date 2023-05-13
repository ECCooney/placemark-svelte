<script lang="ts">
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import type { ChartData } from "../../services/charts";
    import { onMount } from "svelte";
    import { placemarkService } from "../../services/placemark-service";
    import { generateByArea, generateByCategory, getMarkerLayer } from "../../services/placemark-utils";
    import LeafletMap from "$lib/LeafletMap.svelte";
    import AddPlacemark from "$lib/AddPlacemark.svelte";
    import PlacemarkList from "$lib/PlacemarkList.svelte";
    import type { Category, Placemark } from "../../services/placemark-types";
    import { latestPlacemark } from "../../stores";

    let byCategory: ChartData;
    let categoryList: Category[] = [];
    let placemarks: Placemark[] = [];
    let map: LeafletMap;

    async function refreshDashboard() {
		placemarks = await placemarkService.getPlacemarks();
		categoryList = await placemarkService.getCategorys();
		const placemarkMarkerLayer = getMarkerLayer(placemarks);
		if (placemarks.length > 0) {
			const placemarksByCategory = await placemarkService.getPlacemarksByCategorys();
			byCategory = generateByCategory(placemarksByCategory);
			map.populateLayer(placemarkMarkerLayer);
			const lastMarker = placemarkMarkerLayer.markerSpecs[placemarkMarkerLayer.markerSpecs.length - 1];
			map.moveTo(lastMarker.location, 8);
		}
	}

    onMount(async () => {
        placemarkService.checkPageRefresh();
    });

    latestPlacemark.subscribe(async (placemark) => {
		await refreshDashboard();
	});
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns m-2 p-2">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks By Method</h1>
        <Chart data={byCategory} type="pie" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks to date</h1>
        <AddPlacemark {categoryList} />
    </div>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks By Method</h1>
        <LeafletMap height={40} bind:this={map} />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks to date</h1>
        <PlacemarkList {placemarks} />
    </div>
</div>
