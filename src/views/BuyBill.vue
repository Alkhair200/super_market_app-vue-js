<template>
  <div class="">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">الشركات</h3>
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
                      <div class="row">
                        <div class="col-md-4 col-lg-4 col-sm-4 right">
                          <fieldset
                            class="form-group position-relative has-icon-left"
                          >
                            <input
                              type="text"
                              class="form-control input-sm"
                              id="iconLeft12"
                              placeholder="ابحث ...."
                            />
                            <div class="form-control-position">
                              <i class="icon-refresh spinner"></i>
                            </div>
                          </fieldset>
                          <div class="table-responsive table-height2">
                            <table class="table">
                              <thead>
                                <tr></tr>
                              </thead>
                              <tbody class="menu-item">
                                <tr
                                  v-for="(item, index) in allItems"
                                  :key="index"
                                >
                                  <td>{{ item.name }}</td>
                                  <td>{{ item.price }}</td>
                                  <td>
                                    <button
                                      @click="
                                        addOrder(
                                          $event,
                                          item.id,
                                          item.name,
                                          item.quantity,
                                          item.price
                                        )
                                      "
                                      class="btn btn-sm add-product-btn btn-success btn-bill"
                                      :class="'product-' + item.id"
                                    >
                                      <!-- <input type="hidden" value="" class="form-control input-"> -->

                                      <i class="ft-shopping-cart"></i>
                                    </button>
                                  </td>
                                </tr>

                                <!--        <pagination
                                  :data="items"
                                  @pagination-change-page="getItems"
                                />
                                <div>{{ template }}</div> -->
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div class="col-md-8 col-lg-8 col-sm-8 left">
                          <!-- <div class="container"> -->

                          <div class="row">
                            <div class="table-responsive table-height">
                              <table class="table">
                                <thead style="background-color: #eee">
                                  <tr>
                                    <th>حذف</th>
                                    <th colspan="2">البيان</th>
                                    <th>سعر الصنف</th>
                                    <th>كمية الشراء</th>
                                    <th>الخصم</th>
                                    <th>تاريخ الانتهاء</th>
                                  </tr>
                                </thead>
                                <tbody class="order-list">
                                  <!-- <tr v-for="order in orders" v-html="order"></tr> -->
                                  <tr
                                    v-for="(item, index) in orders"
                                    :key="index"
                                  >
                                    <td>
                                      <button
                                        type="button"
                                        @click="removeProduct(item)"
                                        class="btn btn-outline-danger box-shadow-2 btn-sm btn-bill btn-remove"
                                      >
                                        <i class="ft-trash"></i>
                                      </button>
                                    </td>
                                    <td colspan="2">{{ item.name }}</td>
                                    <td>{{ item.price }}</td>
                                    <td>
                                      <input
                                        type="number"
                                        class="touchspin input-quantity"
                                        :min="1"
                                        value="1"
                                        :class="'quantity-' + item.id"
                                        @keypress="isNumber($event)"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        class="touchspin input-quantity"
                                        :min="1"
                                        value="1"
                                        :class="'quantity-' + item.id"
                                        @keypress="isNumber($event)"
                                      />
                                    </td>

                                    <td>
                                      <input
                                        type="date"
                                        class="touchspin input-quantity"
                                        :min="1"
                                        value="1"
                                        :class="'quantity-' + item.id"
                                        @keypress="isNumber($event)"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-2">
                          <label>رقم الفاتورة</label>
                          <fieldset class="form-group" style="width: 75px">
                            <input
                              type="text"
                              v-model="buyBill.invoice_id"
                              class="form-control input-sm"
                              disabled="disabled"
                            />
                          </fieldset>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>المورد</label>
                            <br />
                            <select
                              class="select2 form-control input-sm"
                              v-model="buyBill.importer"
                            >
                              <optgroup label="إختر المورد">
                                <!--         <option
                              v-for="(place, key) in places"
                              :key="key"
                              :value="place.id"
                            >
                              {{ place.name }}
                            </option> -->
                              </optgroup>
                            </select>
                            <!--        <p class="text-left">
                          <small class="danger" v-if="errors.place_id">{{
                            errors.place_id[0]
                          }}</small>
                        </p> -->
                          </div>
                        </div>
                        <div class="col-md-3">
                          <fieldset class="checkboxsas">
                            <label>
                              <input type="checkbox" value="" /> اَجل
                            </label>
                          </fieldset>
                          <fieldset class="checkboxsas">
                            <label>
                              <input type="checkbox" value="" /> كاش
                            </label>
                          </fieldset>
                        </div>
                      </div>
                      <fieldset
                        class="form-group position-relative has-icon-left"
                      >
                        <input
                          type="text"
                          class="form-control round input-sm"
                          id="iconLeft10"
                          placeholder="بحث..."
                          v-model="dataSearch2"
                        />
                        <div class="form-control-position">
                          <i class="icon-magnifier info font-small-3"></i>
                        </div>
                      </fieldset>
                      <div v-show="isLoading">
                        <Spanner2></Spanner2>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>إسم الصنف</th>
                                  <th>الكمية</th>
                                  <th>سعر الصنف</th>
                                  <th>مكان الصنف</th>
                                  <th>تاريخ الانتهاء</th>
                                  <th>كمية الشراء</th>
                                  <th>إجمالي الجمهور</th>
                                  <th>خصم الشراء</th>
                                  <th>سعر وحدة الشراء</th>
                                  <th>سعر الشراء</th>
                                  <th>الربح المتوقع</th>
                                  <th>ملاحظات</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(operation, key) in allOrders"
                                  :key="key"
                                >
                                  <td>{{ key + 1 }}</td>
                                  <td>{{ operation.item_name }}</td>
                                  <td>{{ operation.item_quntity }}</td>
                                  <td>{{ operation.item_price }}</td>
                                  <td>{{ operation.item_placeName }}</td>
                                  <!-- item -->
                                  <td>{{ operation.buy_expire_date }}</td>
                                  <td>{{ operation.buy_quantity }}</td>
                                  <td>{{ operation.buy_total_g }}</td>
                                  <td>{{ operation.buy_discound }}</td>
                                  <td>{{ operation.buy_unit_price }}</td>
                                  <td>{{ operation.buy_total_b }}</td>
                                  <td>{{ operation.buy_earn }}</td>
                                  <td>{{ operation.buy_notes }}</td>
                                  <td>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn btn-icon btn-outline-success btn-op"
                                      v-on:click="edit(operation)"
                                      data-toggle="modal"
                                      data-target="#editOp"
                                    >
                                      <i class="ft-edit"></i>
                                    </button>

                                    <button
                                      type="button"
                                      class="btn btn-icon btn-sm btn-outline-danger btn-op"
                                      v-on:click="deleteOperation(operation.id)"
                                    >
                                      <i class="ft-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-2">
                          <label>الربح المتوقع</label>
                          <input type="text" class="form-control input-sm" />
                        </div>
                        <div class="col-md-2">
                          <label>نسبه الربح المتوقع</label>
                          <input type="text" class="form-control input-sm" />
                        </div>
                        <div class="col-md-2">
                          <label>إضافة مصروفات</label>
                          <input type="text" class="form-control input-sm" />
                        </div>
                        <div class="col-md-2">
                          <label>خصم</label>
                          <input type="text" class="form-control input-sm" />
                        </div>

                        <div class="col-md-2">
                          <label>إجمالي الجمهور</label>
                          <input type="text" class="form-control input-sm" />
                        </div>

                        <div class="col-md-2">
                          <label>إجمالي الشراء</label>
                          <input type="text" class="form-control input-sm" />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-4">
                          <button
                            type="button"
                            class="btn btn-success box-shadow-2 btn-min-width btn-sm"
                          >
                            <i class="ft-save"></i>حفظ
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            class="btn btn-info box-shadow-2 btn-min-width btn-sm"
                            @click="newInvoice()"
                          >
                            <i class="ft-save"></i>فاتوره جديده
                          </button>
                        </div>
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
                    <div class="col-md-4">
                      <fieldset
                        class="form-group position-relative has-icon-left"
                      >
                        <input
                          type="text"
                          class="form-control round input-sm"
                          id="iconLeft10"
                          placeholder="بحث..."
                          v-model="dataSearch1"
                        />
                        <div class="form-control-position">
                          <i class="icon-magnifier info font-small-3"></i>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th></th>
                              <!-- <th></th> -->
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
                            <tr v-for="(item, key) in findData1" :key="key">
                              <td>
                                <button
                                  class="btn btn-sm btn-success btn-bill"
                                  @click="
                                    toggleClass(
                                      item.id,
                                      item.name,
                                      item.quntity,
                                      item.price,
                                      item.place.name,
                                      item.place_id
                                    )
                                  "
                                  :class="'product-' + item.id"
                                >
                                  <i class="ft-shopping-cart"></i>
                                </button>
                              </td>
                              <!-- <td>{{ key + 1 }}</td> -->
                              <td>{{ item.barcode }}</td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.quntity }}</td>
                              <td>{{ item.buy_discound }}</td>
                              <td>{{ item.earn }}</td>
                              <td>{{ item.product.name }}</td>
                              <td>{{ item.company.name }}</td>
                              <td>{{ item.place.name }}</td>
                              <td>{{ item.limit }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>الكميه</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_quantity"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_quantity ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_quantity">{{
                            errors.buy_quantity[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>الخصم</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_discound"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_discound ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_discound">{{
                            errors.buy_discound[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-5">
                      <div class="form-group">
                        <label>ملاحظات</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_notes"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.limit ? 'is-invalid' : '',
                          ]"
                        />
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label>تاريخ الانتهاء</label>
                        <br />
                        <input
                          type="date"
                          v-model="buyBill.buy_expire_date"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_expire_date ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_expire_date">{{
                            errors.buy_expire_date[0]
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
                      type="button"
                      class="btn btn-success box-shadow-2 btn-min-width btn-sm btn-storeOp displayNone"
                    >
                      <i class="ft-save"></i>إضافه
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Start Edit Poeration -->
          <div
            class="modal animated zoomIn float-right"
            id="editOp"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel69"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel69">تعديل صنف</h4>
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
                        <label>سعر الشراء</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_quantity"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_quantity ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_quantity">{{
                            errors.buy_quantity[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>الخصم</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_discound"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_discound ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_discound">{{
                            errors.buy_discound[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label>تاريخ الإنتهاء</label>
                        <br />
                        <input
                          type="date"
                          v-model="buyBill.buy_expire_date"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.buy_expire_date ? 'is-invalid' : '',
                          ]"
                        />
                        <p class="text-left">
                          <small class="danger" v-if="errors.buy_expire_date">{{
                            errors.buy_expire_date[0]
                          }}</small>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group">
                        <label>ملاحظات</label>
                        <br />
                        <input
                          type="text"
                          v-model="buyBill.buy_notes"
                          :class="[
                            'form-control form-control-sm input-sm',
                            errors.price ? 'is-invalid' : '',
                          ]"
                        />
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
                      type="button"
                      class="btn btn-success box-shadow-2 btn-min-width btn-sm"
                      @click="update"
                    >
                      <i class="ft-edit"></i>حفظ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End edit Poeration -->
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
      buyBill: {
        buy_discound: "",
        buy_quantity: "",
        buy_expire_date: "",
        buy_notes: "",

        buy_total_g: "",
        buy_unit_price: "",
        buy_total_b: "",
        buy_earn: "",
      },

      allbuyBill: [],
      allOperations: [],
      orders: [],
      allOrders: [],
      allItems: [],
      errors: [],
      edit_company: false,
      isLoading: false,
      dataSearch1: "",
      dataSearch2: "",

      lastItemId: 0,
    };
  },

  created() {
    this.getOperations();
    this.getItems();
  },

  computed: {
    getToken() {
      return this.$store.getters.get_token;
    },

    findData1() {
      return this.allItems.filter((item) => {
        return item.name.match(this.dataSearch1);
      });
    },

    // findData2() {
    //   return this.allOperations.filter((item) => {
    //     return item.name.match(this.dataSearch2);
    //   });
    // },
  },

  methods: {
    toggleClass(
      itemId,
      itemName,
      itemQuntity,
      itemPrice,
      itemPlaceName,
      itemPlaceId
    ) {
      // let elements = document.querySelectorAll(".btn-bill");

      // Array.prototype.forEach.call(elements, function (element) {
      //   element.classList.remove("btn-light");
      //   element.classList.add("btn-success");
      // });

      // document
      //   .querySelector(".product-" + itemId)
      //   .classList.remove("btn-success");
      // document.querySelector(".product-" + itemId).classList.add("btn-light");

      // document.querySelector(".btn-storeOp").classList.remove("displayNone");

      this.lastItemId = 0;
      this.lastItemId = itemId;

      this.orders.unshift({
        item_id: itemId,
        item_name: itemId,
        item_quantity: itemQuntity,
        item_price: itemPrice,
        item_place_name: itemPlaceName,
        item_place_id: itemPlaceId,

        buy_quantity: "",
        buy_discound: "",
        buy_notes: "",
        buy_expire_date: "",

        buy_total_g: "",
        buy_total_b: "",
        buy_unit_price: "",
        buy_earn: "",
      });
    },

    // addOrder:function () {

    //   this.activeClass ++;

    //   // total_price_out

    //   let total_val =parseInt(price_out)

    //   this.operations.total += total_val

    //   this.operations.final_price = this.operations.total
    //   this.operations.deferred_payment = this.formattedNumber(this.operations.total)

    // },

    addOrder(event, itemId, ItemName, itemQuantity, itemPrice) {
      document
        .querySelector(".product-" + itemId)
        .classList.remove("btn-success");
      document.querySelector(".product-" + itemId).classList.add("btn-light");
      document
        .querySelector(".product-" + itemId)
        .setAttribute("disabled", "disabled");

      this.orders.unshift({
        id: itemId,
        name: ItemName,
        quantity: itemQuantity,
        price: itemPrice,
      });

      this.orders.buy_quantity = this.buyBill.buy_quantity;
      this.orders.buy_discound = this.buyBill.buy_discound;
      this.orders.buy_notes = this.buyBill.buy_notes;
      this.orders.buy_expire_date = this.buyBill.buy_expire_date;
      this.orders.buy_total_g = this.buyBill.buy_total_g;
      this.orders.buy_total_b = this.buyBill.buy_total_b;
      this.orders.buy_unit_price = this.buyBill.buy_unit_price;
      this.orders.buy_earn = this.buyBill.buy_earn;

      // this.allOrders = this.orders;

      // document
      //   .querySelector(".product-" + this.lastItemId)
      //   .classList.remove("btn-light");
      // document
      //   .querySelector(".product-" + this.lastItemId)
      //   .classList.add("btn-success");

      // document.querySelector(".btn-storeOp").classList.add("displayNone");

      // document.querySelector("btn-bill").classList.add("btn-success");
      // if (buy_quantity == null) {
      //   this.errors = {
      //     buy_quantity: "مطلوب",
      //     buy_discound: "مطلوب",
      //     buy_expire_date: "مطلوب",
      //   };
      //   console.log(this.errors.buy_quantity);
      // }
    },

    removeProduct: function (item) {
      // this.activeClass --;

      // let price_out = document.querySelector('.price_out-'+item.id).textContent

      // let price =parseInt(price_out)

      // this.operations.total = this.operations.total - price
      // this.operations.final_price = this.operations.final_price - price
      // this.operations.deferred_payment = this.operations.deferred_payment - price

      document
        .querySelector(".product-" + item.id)
        .classList.add("btn-success");
      document
        .querySelector(".product-" + item.id)
        .classList.remove("btn-light");
      document
        .querySelector(".product-" + item.id)
        .removeAttribute("disabled", "disabled");

      this.orders.splice(this.orders.indexOf(item), 1);

      // if (this.activeClass == 0) {
      //   this.operations.final_price = 0
      //   this.operations.deferred_payment = 0
      // }
    },

    storeOperation() {
      let form = {
        buy_quantity: this.buyBill.buy_quantity,
        buy_discound: this.buyBill.buy_discound,
        buy_expire_date: this.buyBill.buy_expire_date,
        buy_notes: this.buyBill.buy_notes,

        item_id: this.orders.item_id,
        token: this.getToken,
      };
      this.axios
        .post("http://127.0.0.1:8000/api/operation/store", form)
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getOperations();
            this.errors = [];

            this.buyBill.buy_discound = "";
            this.buyBill.buy_quantity = "";
            this.buyBill.buy_notes = "";
            this.buyBill.buy_expire_date = "";
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getItems() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/item/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allItems = res.data.items;
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

    getOperations() {
      this.isLoading = true;
      this.axios
        .post("http://127.0.0.1:8000/api/operation/index", {
          token: this.getToken,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status == true) {
            this.allOperations = res.data.operations;
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

    addNew() {
      this.edit_company = false;
      this.buyBill = {};
      this.errors = [];
    },

    edit(operation) {
      this.buyBill = operation;
      this.errors = [];
    },

    update() {
      let form = {
        buy_quantity: this.buyBill.buy_quantity,
        buy_discound: this.buyBill.buy_discound,
        buy_notes: this.buyBill.buy_notes,
        buy_expire_date: this.buyBill.buy_expire_date,
        token: this.getToken,
      };
      this.axios
        .patch(
          "http://127.0.0.1:8000/api/operation/update/" + this.buyBill.id,
          form
        )
        .then((res) => {
          if (res.data.status == true) {
            this.$notify({
              title: "عمليه ناجه 🎉",
              text: res.data.msg,
              // type: "success",
            });

            this.getbuyBill();
            this.errors = [];
          } else if (res.data.status == false) {
            this.errors = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    newInvoice() {
      this.allOperations = [];
    },

    deleteOperation(id) {
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
            .post("http://127.0.0.1:8000/api/operation/destroy/" + id, {
              token: this.getToken,
            })
            .then((res) => {
              if (res.data.status == true) {
                this.getOperations();
                this.$swal({
                  icon: "success",
                  title: res.data.msg,
                  confirmButtonText: "اغلاق",
                  confirmButtonColor: "#28D094",
                });
                this.getbuyBill();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },

  // Return type only number
  isNumber: function (evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  },
};
</script>

<style>
.btn-bill {
  padding: 5px 7px;
}

.displayNone {
  display: none;
}

.active {
  color: #2a2e30;
  background-color: #babfc7;
  border-color: #babfc7;
}

.touchspin {
  width: 100px;
}

.table-height {
  height: 226px;
}

.table-height2 {
  height: 184px;
  margin-bottom: 10px;
}
</style>
