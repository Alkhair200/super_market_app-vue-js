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
                  <li class="breadcrumb-item"><a href="#">إضافه مستخدم</a></li>
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
                    <h4 class="card-title">
                      <button
                        type="button"
                        class="btn btn-outline-info dropdown-toggle btn-sm"
                        data-toggle="modal"
                        data-target="#zoomIn"
                        v-on:click="addNew"
                      >
                        إضافه مستخدم
                      </button>
                    </h4>

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
                      <div v-show="isLoading">
                        <Spanner2></Spanner2>
                      </div>
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>الإسم</th>
                              <th>الهاتف</th>
                              <th>العنوان</th>
                              <th>العمل</th>
                              <th>إيميل</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in allUsers" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.phone }}</td>
                              <td>{{ item.address }}</td>
                              <td>{{ item.job }}</td>
                              <td>{{ item.email }}</td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-sm btn btn-icon btn-outline-success btn-op"
                                  v-on:click="edit(item)"
                                  data-toggle="modal"
                                  data-target="#zoomIn"
                                >
                                  <i class="la la-edit">تعديل</i>
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-icon btn-sm btn-outline-danger btn-op"
                                  v-on:click="deleteItem(item.id)"
                                  id="type-warning"
                                >
                                  <i class="la la-trash">حذف</i>
                                </button>
                              </td>
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
          <div
            class="modal animated zoomIn float-right"
            id="zoomIn"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel69"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 v-if="edit_user" class="modal-title" id="myModalLabel69">
                    تعديل مستخدم
                  </h4>
                  <h4 v-else class="modal-title" id="myModalLabel69">
                    إضافه مستخدم
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="form-group">
                        <label>الاسم</label>
                        <br />
                        <input
                          type="text"
                          v-model="user.name"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.name ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.name">{{
                            errors.name[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>الهاتف</label>
                        <br />
                        <input
                          type="text"
                          v-model="user.phone"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.phone ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.phone">{{
                            errors.phone[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label>العمل</label>
                        <br />
                        <input
                          type="text"
                          v-model="user.job"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.job ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.job">{{
                            errors.job[0]
                          }}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>إيميل</label>
                        <br />
                        <input
                          type="email"
                          v-model="user.email"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.password ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.email">{{
                            errors.email[0]
                          }}</small>
                        </p>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label v-if="edit_user">كلمة المرور القديمه</label>
                        <label v-else>كلمة المرور</label>
                        <br />
                        <input
                          type="password"
                          v-model="user.password"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.password ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.password">{{
                            errors.password[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label></label>
                        <label v-if="edit_user">كلمة المرور الجديده</label>
                        <label v-else>إعادة كلمة المرور</label>
                        <br />
                        <input
                          type="password"
                          v-model="user.c_password"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.c_password ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.c_password">{{
                            errors.c_password[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group">
                        <label>العنوان </label>
                        <br />
                        <input
                          type="text"
                          v-model="user.address"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.address ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.address">{{
                            errors.address[0]
                          }}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn grey btn-danger box-shadow-2 btn-min-width btn-sm"
                      data-dismiss="modal"
                    >
                      إغلاق
                    </button>

                    <button
                      v-if="edit_user"
                      type="button"
                      class="btn btn-info box-shadow-2 btn-min-width btn-sm"
                      @click="updateUser"
                    >
                      تعديل
                    </button>

                    <button
                      v-else
                      type="button"
                      class="btn btn-success box-shadow-2 btn-min-width btn-sm"
                      @click="storeUser"
                    >
                      <i class="ft-save"></i>حفظ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      user: {
        name: "",
        phone: "",
        address: "",
        job: "",
        email: "",
        password: "",
        id: "",
        token: "",
      },

      allUsers: [],
      errors: [],
      edit_user: false,
      isLoading: false,
    };
  },

  created() {
    this.getUsers();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },
  },

  methods: {
    getUsers() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/users/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allUsers = res.data.users;
          } else if (res.data.status == false) {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addNew() {
      this.edit_user = false;
      this.user = {};
    },

    storeUser() {
      this.user.token = this.getToken;
      this.axios
        .post("http://127.0.0.1:8000/api/users/store", this.user)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getUsers();
            this.user = {};
            this.errors = [];
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    edit(item) {
      this.edit_user = true;
      this.user = item;
      this.errors = [];
    },

    updateUser() {
      let form = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        password: this.user.password,
        c_password: this.user.c_password,
        address: this.user.address,
        job: this.user.job,
        token: this.getToken,
      };

      this.axios
        .patch("http://127.0.0.1:8000/api/users/update/" + this.user.id, form)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getUsers();
            this.errors = [];
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
            if (res.data.errNum == 401) {
              this.$notify({
                title: "عمليه غير ناجحه !",
                text: res.data.msg,
                type: "warning",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteItem(id) {
      this.$swal({
        title: "هل تريد الحذف بالفعل؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28D094",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم, احذف!",
        cancelButtonText: "اغلاق",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .post("http://127.0.0.1:8000/api/users/destroy/" + id, {
              token: this.getToken,
            })
            .then((res) => {
              if (res.data.status == true) {
                this.$swal({
                  icon: "success",
                  title: "تم حذف العنصر بنجاح",
                  confirmButtonText: "اغلاق",
                  confirmButtonColor: "#28D094",
                });
                this.getUsers();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
