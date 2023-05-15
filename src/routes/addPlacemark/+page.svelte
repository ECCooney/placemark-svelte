<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import { onMount } from "svelte";
    import { placemarkService } from "../../services/placemark-service";
    import type { Category, Placemark } from "../../services/placemark-types";
    import AddPlacemark from "../../lib/AddPlacemark.svelte";
    import PlacemarkList from "../../lib/PlacemarkList.svelte";
    import { latestPlacemark } from "../../stores";
	import CategoryGallery from "$lib/CategoryGallery.svelte";
   
    let categoryList: Category[] = [];
    let placemarks: Placemark[] = [];
    let categorys: Category[] = [];


    onMount(async () => {
        placemarkService.checkPageRefresh();
        categoryList = await placemarkService.getCategorys();
        placemarks = await placemarkService.getPlacemarks();
        categorys = await placemarkService.getCategorys();
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
        <h1 class="title is-4">Add a Placemark</h1>
        <AddPlacemark {categoryList} />
    </div>
</div>
<div class="section">
<div class="column has-text-centered">
        <h1 class="title is-4">Productions Tracked</h1>
        <div class = container>
            <div class="columns is-multiline is-centered">
                <CategoryGallery {categorys} />
            </div>      
</div>
</div>
</div>
