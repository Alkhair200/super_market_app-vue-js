<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">الموردين</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">الرئيسيه</router-link>
                  </li>
                  <li class="breadcrumb-item"><a href="#">إضافه مورد</a></li>
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
                        إضافه مورد
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
                          v-model="dataSearch"
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
                              <th>الحساب</th>
                              <th>النوع</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in findData" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.phone }}</td>
                              <td>{{ item.address }}</td>
                              <td>{{ item.balance }}</td>
                              <td>{{ item.type }}</td>
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
                  <h4 class="modal-title" id="myModalLabel69">إضافه مورد</h4>
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
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>الاسم</label>
                        <br />
                        <input
                          type="text"
                          v-model="importers.name"
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
                          v-model="importers.phone"
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
                        <label>الحساب</label>
                        <br />
                        <input
                          type="text"
                          v-model="importers.balance"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.balance ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.balance">{{
                            errors.balance[0]
                          }}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label>العنوان</label>
                        <br />
                        <input
                          type="text"
                          v-model="importers.address"
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

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>النوع</label>
                        <br />
                        <fieldset class="form-group position-relative">
                          <select
                            v-model="importers.type"
                            class="form-control input-sm"
                            id="SmallSelect"
                          >
                            <option selected value="اَجل">اَجل</option>
                            <option value="نقدى">نقدى</option>
                          </select>
                        </fieldset>
                        <p class="text-left">
                          <small class="danger" v-if="errors.type">{{
                            errors.type[0]
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
                      v-if="edit_impoter"
                      type="button"
                      class="btn btn-info box-shadow-2 btn-min-width btn-sm"
                      @click="updateImporter"
                    >
                      تعديل
                    </button>

                    <button
                      v-else
                      type="button"
                      class="btn btn-success box-shadow-2 btn-min-width btn-sm"
                      @click="storeImporter"
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
      importers: {
        name: "",
        phone: "",
        address: "",
        type: "",
        balance: "",
        id: "",
        token: "",
      },

      allImporters: [],
      errors: [],
      edit_impoter: false,
      isLoading: false,
      dataSearch: "",
    };
  },

  created() {
    this.getImporters();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },

    findData() {
      return this.allImporters.filter((importer) => {
        return importer.name.match(this.dataSearch);
      });
    },
  },

  methods: {
    getImporters() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/importer/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allImporters = res.data.importer;
          } else if (res.data.status == false) {
            this.isLoading = false;
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },

    storeImporter() {
      this.importers.token = this.getToken;
      this.axios
        .post("http://127.0.0.1:8000/api/importer/store", this.importers)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getImporters();
            this.errors = [];
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addNew() {
      this.edit_impoter = false;
      this.importers = {};
      this.errors = [];
    },

    edit(item) {
      this.edit_impoter = true;
      this.importers = item;
      this.errors = [];
    },

    updateImporter() {
      let form = {
        name: this.importers.name,
        balance: this.importers.balance,
        phone: this.importers.phone,
        address: this.importers.address,
        type: this.importers.type,
        token: this.getToken,
      };
      this.axios
        .patch(
          "http://127.0.0.1:8000/api/importer/update/" + this.importers.id,
          form
        )
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getImporters();
            this.errors = [];
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
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
            .post("http://127.0.0.1:8000/api/importer/destroy/" + id, {
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
                this.getImporters();
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
