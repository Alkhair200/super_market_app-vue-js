<template>
  <div v-show="isLoading">
    <Spanner1 />
  </div>

  <div class="bg-shadow">
    <div class="app-content content" style="margin-right: 0">
      <div class="content-wrapper">
        <div class="content-header row"></div>
        <div class="content-body">
          <section class="flexbox-container">
            <div
              class="col-12 d-flex align-items-center justify-content-center"
            >
              <div class="card-login col-md-4 col-10 box-shadow-2 p-0">
                <div class="card border-grey border-lighten-3 m-0">
                  <div class="card-header border-0">
                    <div class="card-title text-center">
                      <div class="p-1">
                        <img
                          src="dashboard/app-assets/images/logo/logo-dark.png"
                          alt="branding logo"
                        />
                      </div>
                    </div>
                    <h6
                      class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"
                    >
                      <span>تسجيل الدخول</span>
                    </h6>
                    <small class="danger" v-if="errors.errNum == 401">{{
                      errors.msg
                    }}</small>
                  </div>
                  <div class="card-content">
                    <div class="card-body">
                      <form
                        class="form-horizontal form-simple"
                        action="index.html"
                        novalidate
                      >
                        <fieldset
                          class="form-group position-relative has-icon-left mb-0"
                        >
                          <input
                            type="email"
                            :class="[
                              'form-control form-control-lg input-lg',
                              errors.email ? 'is-invalid' : '',
                            ]"
                            id="user-name"
                            placeholder="إيميل"
                            required
                            v-model="user.email"
                          />
                          <div class="form-control-position">
                            <i class="ft-user"></i>
                          </div>
                          <p class="text-left">
                            <small class="danger" v-if="errors.email">{{
                              errors.email[0]
                            }}</small>
                          </p>
                        </fieldset>
                        <fieldset
                          class="form-group position-relative has-icon-left"
                        >
                          <input
                            type="password"
                            :class="[
                              'form-control form-control-lg input-lg',
                              errors.password ? 'is-invalid' : '',
                            ]"
                            id="user-password"
                            placeholder="كلمة المرور"
                            required
                            v-model="user.password"
                          />
                          <div class="form-control-position">
                            <i class="la la-key"></i>
                          </div>
                          <p class="text-left">
                            <small class="danger" v-if="errors.password">{{
                              errors.password[0]
                            }}</small>
                          </p>
                        </fieldset>
                        <div class="form-group row">
                          <div class="col-md-6 col-12 text-center text-md-left">
                            <fieldset>
                              <input
                                type="checkbox"
                                id="remember-me"
                                class="chk-remember"
                              />
                              <label for="remember-me"> تذكرني</label>
                            </fieldset>
                          </div>
                          <!--                           <div
                            class="col-md-6 col-12 text-center text-md-right"
                          >
                            <a href="recover-password.html" class="card-link"
                              >Forgot Password?</a
                            >
                          </div> -->
                        </div>
                        <button
                          type="submit"
                          class="btn btn-info btn-lg btn-block"
                          @click.prevent="performLogin"
                        >
                          <i class="ft-unlock"></i> دخول
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spanner1 from "../components/Spanner_1.vue";
export default {
  components: {
    Spanner1,
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      errors: "",
      isLoading: false,
    };
  },

  methods: {
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginAction", {
          email: this.user.email,
          password: this.user.password,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.isLoading = false;
            this.$router.push("/");
          } else {
            if (res.data.status == false) {
              this.isLoading = false;
              if (res.data.errNum == 401) {
                this.isLoading = false;
                this.errors = res.data;
              } else {
                this.isLoading = false;
                this.errors = res.data.msg;
              }
            }
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style>
html body.fixed-navbar {
  margin: 0;
  padding: 0;
}
</style>
