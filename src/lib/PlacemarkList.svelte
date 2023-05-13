<script lang="ts">
    import type { Placemark } from "../services/placemark-types";

    export let placemarks: Placemark[];
</script>

<table class="table is-fullwidth">
<thead>
    <th>Placemark Name</th>
    <th>Placemark Area</th>
    <th>Placemark Contributor</th>
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
                {placemark.contributor.email}
            </td>
        </tr>
    {/each}
</tbody>
</table>