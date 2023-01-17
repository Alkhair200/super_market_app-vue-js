<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">
              تقارير الحضور و الإنصراق
            </h3>
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
                        <div class="col-md-3">
                          <label>الفترة من</label>
                          <input
                            type="date"
                            v-model="reports.from"
                            class="form-control input-sm"
                          />
                        </div>

                        <div class="col-md-3">
                          <label>الي</label>
                          <fieldset class="form-group">
                            <input
                              type="date"
                              v-model="reports.to"
                              class="form-control input-sm"
                            />
                          </fieldset>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                            <label>المستخدم</label>
                            <br />
                            <select
                              :class="[
                                'select2 form-control input-sm',
                                errors.user_id ? 'is-invalid' : '',
                              ]"
                              v-model="reports.user_id"
                            >
                              <option
                                v-for="(item, key) in allusers"
                                :key="key"
                                :value="item.id"
                              >
                                {{ item.name }}
                              </option>
                            </select>
                            <!--                           <p class="text-left">
                          <small class="danger" v-if="errors.user_id">{{
                            errors.user_id[0]
                          }}</small>
                        </p> -->
                          </div>
                        </div>

                        <div class="col-md-2" style="padding: 25px 0">
                          <div class="form-group">
                            <button
                              type="button"
                              class="btn btn-sm btn btn-icon btn-outline-success btn-op"
                              v-on:click="getreports()"
                            >
                              <i class="la la-edit">بحث</i>
                            </button>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <!-- <label>البحث السريع</label> -->
                          <fieldset
                            class="form-group position-relative has-icon-left"
                          >
                            <input
                              type="text"
                              class="form-control round input-sm"
                              id="iconLeft10"
                              placeholder="البحث السريع..."
                            />
                            <div class="form-control-position">
                              <i class="icon-magnifier info font-small-3"></i>
                            </div>
                          </fieldset>
                        </div>

                        <div class="col-md-6">
                          <p>
                            <button
                              type="button"
                              class="btn btn-block btn-sm btn btn-icon btn-outline-success btn-op"
                            >
                              <i class="la la-edit">طبع</i>
                            </button>
                          </p>
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
                              <th>تاريخ الحضور</th>
                              <th>فارق الوقت</th>
                              <th>ملاحظات</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in reportss" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.name }}</td>

                              <td>{{ item.time }}</td>
                              <td>{{ item.date }}</td>
                              <td>{{ item.difference }}</td>
                              <td>{{ item.notes }}</td>
                              <!-- <td>{{ totalDuration + item.difference }}</td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="">
                      <div class="col-md-6">
                        <p>
                          إجمالي ساعات الحضور : &nbsp;
                          <span>{{ totalDuration }}</span>
                        </p>
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
      reports: {
        user_id: "",
        to: "",
        token: "",
        from: "",
      },

      reportss: [],
      isLoading: false,
      allusers: [],
      errors: [],
      totalDuration: 0,
    };
  },

  created() {
    this.hodoorUser();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },
  },

  methods: {
    hodoorUser() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/action/hodoor-user", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allusers = res.data.users;
          } else if (res.data.status == false) {
            this.isLoading = false;
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getreports() {
      this.isLoading = true;
      this.reports.token = this.getToken;
      this.axios
        .post("http://127.0.0.1:8000/api/report/report-user", this.reports)
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.reportss = res.data.report;
            this.totalDuration = res.data.totalDuration;
            this.errors = [];
          } else if (res.data.status == false) {
            this.isLoading = false;
            console.log(res.data.msg);
            this.errors = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
