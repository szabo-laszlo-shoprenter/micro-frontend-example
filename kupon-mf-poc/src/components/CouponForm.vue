<template>
  <div class="coupon-form">
    <h1>Add New Coupon</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="coupon-code">Coupon Code:</label>
        <input
            type="text"
            id="coupon-code"
            v-model="coupon.code"
            placeholder="Írd be a kupon kódot"
            required
        />
      </div>

      <div class="form-group">
        <label for="discount">Discount (%):</label>
        <input
            type="number"
            id="discount"
            v-model.number="coupon.discount"
            min="0"
            max="100"
            placeholder="Pl. 20"
            required
        />
      </div>

      <div class="form-group">
        <label for="expiration-date">Expiration Date:</label>
        <input
            type="date"
            id="expiration-date"
            v-model="coupon.expirationDate"
            required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CouponForm",
  data() {
    return {
      coupon: {
        code: "",
        discount: null,
        expirationDate: ""
      }
    }
  },
  methods: {
    handleSubmit() {
      // Itt feldolgozhatod az űrlap adatokat, például elküldheted őket egy API-nak
      console.log("Submitted coupon:", this.coupon)

      // Az űrlap sikeres elküldése után resetelheted az adatokat
      this.coupon = {
        code: "",
        discount: null,
        expirationDate: ""
      }
    }
  }
}
</script>

<style scoped>
.coupon-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
