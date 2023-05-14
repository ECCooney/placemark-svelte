<script lang="ts">
  import { placemarkService } from "../services/placemark-service";
  import type { Category } from "../services/placemark-types";
  import { loggedInUser } from "../stores";
  import Coordinates from "$lib/Coordinates.svelte";

  export let categoryList: Category[] = [];

  let name = "";
  let description = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let selectedCategory = "";
  let areas = ["RoI", "NI"];
  let selectedArea = "";
  let message = "Please add a Placemark";

  async function addPlacemark() {
      if (selectedCategory && name && selectedArea) {
          const category = categoryList.find((category) => category.name);
          if (category) {
              const placemark = {
                  name: name,
                  description: description,
                  area: selectedArea,
                  category: category,
                  lat: lat,
                  lng: lng,
                  contributor: $loggedInUser,
                  _id: ""
              };
              const success = await placemarkService.addPlacemark(placemark);
              if (!success) {
                  message = "Placemark not completed - some error occurred";
                  return;
              }
              message = `Thanks! You added ${placemark.name} to ${category.name}`;
          }
      } else {
          message = "Please select amount, method and category";
      }
  }
</script>

<form on:submit|preventDefault={addPlacemark}>
  <div class="field">
      <label class="label" for="name">Enter Place Name</label>
      <input bind:value={name} class="input" id="name" name="name" type="string" />
  </div>
  <div class="field">
    <label class="label" for="description">Enter Description</label>
    <input bind:value={description} class="input" id="description" name="description" type="string" />
</div>
  <div class="field">
      <div class="control">
          {#each areas as area}
              <input bind:group={selectedArea} class="radio" type="radio" value={area} /> {area}
          {/each}
      </div>
  </div>
  <div class="field">
      <div class="select">
          <select bind:value={selectedCategory}>
              {#each categoryList as category}
                  <option>{category.name}</option>
              {/each}
          </select>
      </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
      <div class="control">
          <button class="button is-link is-light">Add</button>
      </div>
  </div>
  <div class="box">
      {message}
  </div>
</form>
