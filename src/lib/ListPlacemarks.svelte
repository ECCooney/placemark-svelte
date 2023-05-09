<script>
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service";

    let placemarkList =[];

onMount(async () => {
  placemarkList = await placemarkService.getPlacemarks();
});

</script>

<table class="table is-fullwidth">
<thead>
    <th>Placemark Name</th>
</thead>
<tbody>
    {#each placemarkList as placemark}
        <tr>
            <td>
                {placemark.name}
            </td>
        </tr>
    {/each}
</tbody>
</table>