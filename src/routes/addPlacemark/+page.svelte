<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import { onMount } from "svelte";
    import { placemarkService } from "../../services/placemark-service";
    import type { Category, Placemark } from "../../services/placemark-types";
    import AddPlacemark from "../../lib/AddPlacemark.svelte";
    import PlacemarkList from "../../lib/PlacemarkList.svelte";
    import { latestPlacemark } from "../../stores";
   
    let categoryList: Category[] = [];
    let placemarks: Placemark[] = [];


    onMount(async () => {
        placemarkService.checkPageRefresh();
        categoryList = await placemarkService.getCategorys();
        placemarks = await placemarkService.getPlacemarks();
    });

    latestPlacemark.subscribe(async (placemark) => {
        placemarks = await placemarkService.getPlacemarks();
    });

</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column has-text-centered">
        <h1 class="title is-4">Placemarks by To Date</h1>
        <PlacemarkList {placemarks} />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Make a Placemark</h1>
        <AddPlacemark {categoryList} />
    </div>
</div>