<script lang="ts">
    import type { Category } from "../services/placemark-types";

    export let categorys: Category[];
</script>

<table class="table is-fullwidth">
<thead>
    <th>Category Name</th>
</thead>
<tbody>
    {#each categorys as category}
        <tr>
            <td>
                {category.name}
            </td>
            <td>
                {category.img}
            </td>
    {/each}
</tbody>
</table>