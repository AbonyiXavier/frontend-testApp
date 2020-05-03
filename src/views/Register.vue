<template>
  <div>
    <form @submit.prevent="register" enctype="multipart/form-data">
      <label for="name">First Name:</label>
      <input v-model="firstName" type="text" name="name" value />

      <label for="name">Last Name:</label>
      <input v-model="lastName" type="text" name="name" value />

      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password" value />

      <label for="password">Phone:</label>
      <input v-model="phone" type="number" name="phone" value />

      <label for="password">upload file:</label>
      <input type="file" ref="file" name="file" value @change="selectFile" />

      <button type="submit" name="button">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      file: "",
      is_admin: 0,
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async register() {
      let formData = new FormData();
      formData.append("first_name", this.firstName);
      formData.append("last_name", this.lastName);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("phone_number", this.phone);
      formData.append("image", this.file);
      formData.append("is_admin", this.is_admin);

      try {
        await this.$store.dispatch("register", formData).then(() => {
          this.$router.push("/");
        });
      } catch (error) {
        console.log("my error", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
