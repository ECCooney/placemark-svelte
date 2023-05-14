<script lang="ts">

import type { Category } from "../services/placemark-types";
export let categorys: Category[];

</script>

{#each categorys as category}
<div class="column is-one-third">
  
  <div class="card w-72 bg-base-100 shadow-lg p-10 m-2">
    <div class="card-image">
    <figure class="image is-square">
        <img alt="Cover image" src={category.img}>
    </figure>
    </div>
    <div class="card-content">
      <div class="title is-centered">
          {category.name}
      </div>
   </div>
  </div>
</div>
{/each}