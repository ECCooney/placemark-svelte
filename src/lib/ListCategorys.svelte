<script>
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service";

    let categoryList =[];

    onMount(async () => {
      categoryList = await placemarkService.getCategorys();
    });
 
  </script>

<table class="table is-fullwidth">
    <thead>
        <th>Production Name</th>
    </thead>
    <tbody>
        {#each categoryList as category}
            <tr>
                <td>
                    {category.name}
                </td>
            </tr>
        {/each}
    </tbody>
</table>