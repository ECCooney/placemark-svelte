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
    import CategoryList from "$lib/CategoryList.svelte";
    import type { Category, Placemark } from "../../services/placemark-types";
    import { latestPlacemark } from "../../stores";

    let byCategory: ChartData;
    let byArea: ChartData;
    let categoryList: Category[] = [];
    let placemarks: Placemark[] = [];
    let categorys: Category[];
    let map: LeafletMap;

    async function refreshDashboard() {
		placemarks = await placemarkService.getPlacemarks();
		categoryList = await placemarkService.getCategorys();
		const placemarkMarkerLayer = getMarkerLayer(placemarks);
		if (placemarks.length > 0) {
			const placemarksByCategory = await placemarkService.getPlacemarksByCategorys();
			byCategory = generateByCategory(placemarksByCategory);
            byArea = generateByArea(placemarks)
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
        <h1 class="title is-4">Locations by Production</h1>
        <Chart data={byCategory} type="bar" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Locations North or South</h1>
        <Chart data={byArea} type="pie" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Add New Location </h1>
        <AddPlacemark {categoryList} />
    </div>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">All Island Map</h1>
        <LeafletMap height={40} bind:this={map} />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">All Listed Locations</h1>
        <PlacemarkList {placemarks} />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">All Listed Categorys</h1>
        <CategoryList {categorys} />
    </div>
</div>
