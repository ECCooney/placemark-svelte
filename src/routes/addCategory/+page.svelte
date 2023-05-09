<script>
    import Header from '$lib/Header.svelte';
    import AddCategory from '$lib/AddCategory.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <img alt="Homer" src="/logo.png" width="300" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Add a Category!</h1>
        <AddCategory />
    </div>
</div>
