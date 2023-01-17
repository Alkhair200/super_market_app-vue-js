<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">الاصناف</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">الرئيسيه</router-link>
                  </li>
                  <li class="breadcrumb-item"><a href="#">إضافه صنف</a></li>
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
                        إضافه صنف
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
                              <th>الباركود</th>
                              <th>الإسم</th>
                              <th>السعر</th>
                              <th>الكميه</th>
                              <th>أكبر خصم</th>
                              <th>ربحية الصنف</th>
                              <th>القسم</th>
                              <th>الشركه</th>
                              <th>الموقع</th>
                              <th>إعادة الطلب</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in findData" :key="key">
                              <td>{{ key + 1 }}</td>
                              <td>{{ item.barcode }}</td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.quntity }}</td>
                              <td>{{ item.max_discound }}</td>
                              <td>{{ item.earn }}</td>
                              <td>{{ item.product_id }}</td>
                              <td>{{ item.company_id }}</td>
                              <td>{{ item.place_id }}</td>
                              <td>{{ item.limit }}</td>
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
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel69">إضافه صنف</h4>
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
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>باركود</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.barcode"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.barcode ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.barcode">{{
                            errors.barcode[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>الاسم</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.name"
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

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>الكميه</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.quntity"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.quntity ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.quntity">{{
                            errors.quntity[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>السعر</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.price"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.price ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.price">{{
                            errors.price[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>أكبر خصم</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.max_discound"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.max_discound ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.max_discound">{{
                            errors.max_discound[0]
                          }}</small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>ربحية الصنف</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.earn"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.earn ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.earn">{{
                            errors.earn[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label>الشركه</label>
                        <br />
                        <select
                          class="select2 form-control input-sm"
                          v-model="items.company_id"
                        >
                          <optgroup label="إختر الشركة">
                            <option
                              v-for="(company, key) in companies"
                              :key="key"
                              :value="company.id"
                            >
                              {{ company.name }}
                            </option>
                          </optgroup>
                        </select>
                        <p class="text-left">
                          <small class="danger" v-if="errors.company_id">{{
                            errors.company_id[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>القسم</label>
                        <br />
                        <select
                          class="select2 form-control input-sm"
                          v-model="items.product_id"
                        >
                          <optgroup label="إختر القسم">
                            <option
                              v-for="(product, key) in products"
                              :key="key"
                              :value="product.id"
                            >
                              {{ product.name }}
                            </option>
                          </optgroup>
                        </select>
                        <p class="text-left">
                          <small class="danger" v-if="errors.product_id">{{
                            errors.product_id[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label>إعادة الطلب</label>
                        <br />
                        <input
                          type="text"
                          v-model="items.limit"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.limit ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.limit">{{
                            errors.limit[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group">
                        <label>موقع الصنف</label>
                        <br />
                        <select
                          class="select2 form-control input-sm"
                          v-model="items.place_id"
                        >
                          <optgroup label="إختر الموقع">
                            <option
                              v-for="(place, key) in places"
                              :key="key"
                              :value="place.id"
                            >
                              {{ place.name }}
                            </option>
                          </optgroup>
                        </select>
                        <p class="text-left">
                          <small class="danger" v-if="errors.place_id">{{
                            errors.place_id[0]
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
                      v-if="edit_item"
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
      items: {
        name: "",
        barcode: "",
        limit: "",
        earn: "",
        quntity: "",
        price: "",
        place_id: "",
        company_id: "",
        product_id: "",
        max_discound: "",
        token: "",
      },

      allitems: [],
      errors: [],
      companies: [],
      places: [],
      products: [],
      edit_item: false,
      isLoading: false,
      dataSearch: "",
    };
  },

  created() {
    this.getItems();
    this.getPlaces();
    this.getProducts();
    this.getCompanies();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },

    findData() {
      return this.allitems.filter((item) => {
        return item.name.match(this.dataSearch);
      });
    },
  },

  methods: {
    getItems() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/item/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allitems = res.data.items;
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

    getCompanies() {
      this.axios
        .post("http://127.0.0.1:8000/api/company/index", {
          token: this.getToken,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.companies = res.data.companies;
          } else if (res.data.status == false) {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getProducts() {
      this.axios
        .post("http://127.0.0.1:8000/api/product/index", {
          token: this.getToken,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.products = res.data.products;
          } else if (res.data.status == false) {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPlaces() {
      this.axios
        .post("http://127.0.0.1:8000/api/place/index", {
          token: this.getToken,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.places = res.data.places;
          } else if (res.data.status == false) {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    store() {
      console.log(this.getToken);
      this.items.token = this.getToken;
      this.axios
        .post("http://127.0.0.1:8000/api/item/store", this.items)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getItems();
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

    addNew() {
      this.edit_item = false;
      this.items = {};
      this.errors = [];
    },

    edit(item) {
      this.edit_item = true;
      this.items = item;
      this.errors = [];
    },

    update() {
      let form = {
        name: this.items.name,
        token: this.getToken,
      };
      this.axios
        .patch("http://127.0.0.1:8000/api/item/update/" + this.items.id, form)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getitems();
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
            .post("http://127.0.0.1:8000/api/item/destroy/" + id, {
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
                this.getItems();
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
