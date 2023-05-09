<script>
  // @ts-nocheck
  
      import { onMount } from "svelte";
      import { placemarkService } from "../services/placemark-service";
  
      let categoryList = [];
      let selectedCategory = "";
  
      let name = "";
      let description = "";
      let latitude = 0;
      let longitude = 0;
  
      let message = "";
  
      onMount(async () => {
          categoryList = await placemarkService.getCategorys();
      });
  
      async function addPlacemark() {
        if (name && description && latitude && longitude && selectedCategory) {
          const categoryNames = selectedCategory.split(",");
            const category = categoryList.find((category) => category.name == categoryNames[0]);
            const placemark = {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        category: category._id,
      };
            const success = await placemarkService.addPlacemark(placemark);
            if (!success) {
                message = "Addition not completed - some error occurred";
                return;
            }
            message = `Thanks! You added ${placemark.name}`;
        } 
    }
  </script>
  
  <form on:submit|preventDefault={addPlacemark}>
    <div class="field">
      <label class="label" for="name">Name</label> <input bind:value={name} class="input" id="name" name="name" placeholder="name">
    </div>
    <div class="field">
      <label class="label" for="description">Description</label> <input bind:value={description} class="input" id="description" name="description" placeholder="description">
    </div>
    <div class="field">
      <label class="label" for="latitude">Latitude</label> <input bind:value={latitude} class="input" id="latitude" name="latitude" placeholder="latitude">
    </div>
    <div class="field">
      <label class="label" for="longitude">Longitude</label> <input bind:value={longitude} class="input" id="longitude" name="longitude" placeholder="longitude">
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
  <div class="field">
      <div class="control">
          <button class="button is-link is-light">Add</button>
      </div>
  </div>
  <div class="box">
      {message}
  </div>
</form>