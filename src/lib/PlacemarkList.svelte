<script lang="ts">
    import type { Placemark } from "../services/placemark-types";

    export let placemarks: Placemark[];
</script>

<table class="table is-fullwidth">
<thead>
    <th>Location</th>
    <th>Region</th>
    <th>Production</th>
    <th>Contributor</th>
</thead>
<tbody>
    {#each placemarks as placemark}
        <tr>
            <td>
                {placemark.name}
            </td>
            <td>
                {placemark.area}
            </td>
            <td>
                {placemark.category.name}
            </td>
            <td>
                {placemark.contributor.email}
            </td>
        </tr>
    {/each}
</tbody>
</table>