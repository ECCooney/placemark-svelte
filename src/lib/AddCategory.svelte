<script>
  import {onMount} from "svelte";
  import { placemarkService } from "../services/placemark-service";

  let name = "";
  let message = "Enter Name of Category";
  let errorMessage = "";
  
  async function addCategory() {
    const success = await placemarkService.addCategory(name)
      if (!success) {
        message = "Addition not completed - some error occurred";
        return;
      }
      message = `Thanks!`;
  }
  </script>

<form on:submit|preventDefault={addCategory}>
  <div class="field">
    <label class="label" for="name">Enter Category Name</label> 
    <input bind:value={name} class="input" id="name" name="name" placeholder="Category Name" type="text">
  </div>
    <div class="field is-grouped">
      <button class="button is-link is-light">Add Category</button>
  <div class="section"></div>
    {message}
  </div>
</form>