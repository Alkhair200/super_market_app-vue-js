<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">المستخدمين</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">الرئيسيه</router-link>
                  </li>
                  <!-- <li class="breadcrumb-item"><a href="#">إضافه مستخدم</a></li> -->
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="content-body">
          <!-- Revenue, Hit Rate & Deals -->
          <section
            class="multiple-input-with-labels"
            id="multiple-input-with-labels"
          >
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title"></h4>

                    <a class="heading-elements-toggle"
                      ><i class="ft-align-justify font-medium-3"></i
                    ></a>
                    <div class="heading-elements">
                      <ul class="list-inline mb-0">
                        <li>
                          <a data-action="collapse"><i class="ft-minus"></i></a>
                        </li>
                        <li>
                          <a data-action="reload"
                            ><i class="ft-rotate-cw"></i
                          ></a>
                        </li>
                        <li>
                          <a data-action="expand"
                            ><i class="ft-maximize"></i
                          ></a>
                        </li>
                        <li>
                          <a data-action="close"><i class="ft-x"></i></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-content collapse show">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <label>البحث السريع</label>
                          <fieldset
                            class="form-group position-relative has-icon-left"
                          >
                            <input
                              type="text"
                              class="form-control round input-sm"
                              id="iconLeft10"
                              placeholder="بحث..."
                            />
                            <div class="form-control-position">
                              <i class="icon-magnifier info font-small-3"></i>
                            </div>
                          </fieldset>
                        </div>
                      </div>

                      <div v-show="isLoading">
                        <Spanner2></Spanner2>
                      </div>
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>الإسم</th>
                              <th>وقت الحضور</th>
                              <th>وقت الإنصراف</th>
                              <th>الفرق بالساعات</th>
                              <th>ملاحظات</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in enserafs" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.come }}</td>
                              <td>{{ item.go }}</td>
                              <td>{{ item.difference }}</td>
                              <td>{{ item.notes }}</td>
                              <td v-if="item.go == null">
                                <button
                                  type="button"
                                  class="btn btn-sm btn btn-icon btn-outline-success btn-op"
                                  v-on:click="updateHodoor(item.id)"
                                >
                                  <i class="la la-edit">إنصراف</i>
                                </button>
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!--/ Revenue, Hit Rate & Deals -->
          <!-- Analytics map based session -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spanner2 from "../components/Spanner_2.vue";
export default {
  components: {
    Spanner2,
  },
  data() {
    return {
      hodoor: {
        user_id: "",
        token: "",
        notes: "",
      },

      allHodoor: [],
      enserafs: [],
      isLoading: false,
    };
  },

  created() {
    this.getEnseraf();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },
  },

  methods: {
    getEnseraf() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/action/get-enseraf", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.enserafs = res.data.enseraf;
          } else if (res.data.status == false) {
            this.isLoading = false;
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateHodoor(id) {
      this.axios
        .patch("http://127.0.0.1:8000/api/action/enseraf/" + id, {
          token: this.getToken,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getEnseraf();
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
            if (res.data.errNum == 404) {
              this.$notify({
                title: "عمليه غير ناجحه !",
                // text: res.data.msg,
                type: "error",
              });
            }
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
