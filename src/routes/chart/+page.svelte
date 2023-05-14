<script lang="ts">
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import type { ChartData } from "../../services/charts";
    import { onMount } from "svelte";
    import { placemarkService } from "../../services/placemark-service";
    import { generateByArea, generateByCategory } from "../../services/placemark-utils";

    let byArea: ChartData;
    let byCategory: ChartData;

    onMount(async () => {
        placemarkService.checkPageRefresh();

        const placemarks = await placemarkService.getPlacemarks();
        const placemarksByCategory = await placemarkService.getPlacemarksByCategorys();
        byArea= generateByArea(placemarks);
        byCategory = generateByCategory(placemarksByCategory);
    });
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks By Method</h1>
        <Chart data={byArea} type="bar" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks to date</h1>
        <Chart data={byCategory} type="pie" />
    </div>
</div>
