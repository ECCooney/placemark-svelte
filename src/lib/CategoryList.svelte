<script lang="ts">
    import type { Category } from "../services/placemark-types";

    export let categorys: Category[];
</script>

<table class="table is-fullwidth">
<thead>
    <th>category Name</th>
</thead>
<tbody>
    {#each categorys as category}
        <tr>
            <td>
                {category.name}
            </td>
        </tr>
    {/each}
</tbody>
</table>