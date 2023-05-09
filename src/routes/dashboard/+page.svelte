<script>
    import Header from '$lib/Header.svelte';
    import ListCategories from '$lib/ListCategorys.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import AddCategory from '$lib/AddCategory.svelte';
    import ListCategorys from '$lib/ListCategorys.svelte';
	import AddPlacemark from '$lib/AddPlacemark.svelte';
    import ListPlacemarks from '$lib/ListPlacemarks.svelte';
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column has-text-centered">
        <img alt="Homer" src="/logo.png" width="300" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Categories</h1>
        <ListCategories />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Categories</h1>
        <AddCategory />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Categories</h1>
        <AddPlacemark />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Categories</h1>
        <ListPlacemarks />
    </div>
</div>