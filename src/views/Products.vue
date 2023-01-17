<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">المنتجات</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">الرئيسيه</router-link>
                  </li>
                  <li class="breadcrumb-item"><a href="#">إضافه منتج</a></li>
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
                        إضافه منتج
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
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in findData" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.name }}</td>
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
                  <h4 class="modal-title" id="myModalLabel69">إضافه منتج</h4>
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
                          v-model="products.name"
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
                      v-if="edit_product"
                      type="button"
                      class="btn btn-info box-shadow-2 btn-min-width btn-sm"
                      @click="update"
                    >
                      تعديل
                    </button>

                    <button
                      v-else
                      type="button"
                      class="btn btn-success box-shadow-2 btn-min-width btn-sm"
                      @click="store"
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
      products: {
        name: "",
        token: "",
      },

      allproducts: [],
      errors: [],
      edit_product: false,
      isLoading: false,
      dataSearch: "",
    };
  },

  created() {
    this.getproducts();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },

    findData() {
      return this.allproducts.filter((product) => {
        return product.name.match(this.dataSearch);
      });
    },
  },

  methods: {
    getproducts() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/product/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allproducts = res.data.products;
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

    store() {
      this.products.token = this.getToken;
      this.axios
        .post("http://127.0.0.1:8000/api/product/store", this.products)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getproducts();
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
      this.edit_product = false;
      this.products = {};
      this.errors = [];
    },

    edit(item) {
      this.edit_product = true;
      this.products = item;
      this.errors = [];
    },

    update() {
      let form = {
        name: this.products.name,
        token: this.getToken,
      };
      this.axios
        .patch(
          "http://127.0.0.1:8000/api/product/update/" + this.products.id,
          form
        )
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getproducts();
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
            .post("http://127.0.0.1:8000/api/product/destroy/" + id, {
              token: this.getToken,
            })
            .then((res) => {
              if (res.data.status == true) {
                this.$swal({
                  icon: "success",
                  title: res.data.msg,
                  confirmButtonText: "اغلاق",
                  confirmButtonColor: "#28D094",
                });
                this.getproducts();
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
