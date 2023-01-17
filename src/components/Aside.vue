<template>
  <div v-show="loggedIn">
    <div
      class="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div class="main-menu-content">
        <ul
          class="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <li class="nav-item">
            <router-link to="/"
              ><i class="la la-home"></i
              ><span class="menu-title" data-i18n="nav.dash.main"
                >الرئيسيه</span
              >
            </router-link>
          </li>

          <li class="nav-item">
            <a href="#"
              ><i class="la la-navicon"></i
              ><span class="menu-title" data-i18n="nav.navbars.main"
                >الفواتير</span
              ></a
            >
            <ul class="menu-content">
              <li>
                <router-link
                  class="menu-item"
                  to="/report-user"
                  data-i18n="nav.navbars.nav_light"
                  >مبيعات</router-link
                >
              </li>

              <li>
                <router-link
                  class="menu-item"
                  to="/buy-bill"
                  data-i18n="nav.navbars.nav_light"
                  >مشتريات</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/importer"
              ><i class="la la-angle-double-down"></i
              ><span class="menu-title" data-i18n="nav.dash.main"
                >الموردين</span
              >
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/customer"
              ><i class="la la-male"></i
              ><span class="menu-title" data-i18n="nav.dash.main">العملاء</span>
            </router-link>
          </li>

          <li class="nav-item">
            <a href="#"
              ><i class="la la-television"></i
              ><span class="menu-title" data-i18n="nav.templates.main"
                >كل الاصناف</span
              ></a
            >
            <ul class="menu-content">
              <li>
                <router-link
                  class="menu-item"
                  to="/item"
                  data-i18n="nav.templates.vert.classic_menu"
                  >إضافة صنف</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  to="/product"
                  data-i18n="nav.templates.vert.classic_menu"
                  >المنتجات</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  to="/company"
                  data-i18n="nav.templates.vert.main"
                  >الشركات المصنعه</router-link
                >
                <ul class="menu-content">
                  <li>
                    <router-link class="menu-item" to="/place"
                      >مواقع الاصناف</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#"
              ><i class="la la-group"></i
              ><span class="menu-title" data-i18n="nav.page_layouts.main"
                >كل المستخدمين</span
              ><span
                class="badge badge badge-pill badge-danger float-right mr-2"
                >New</span
              ></a
            >
            <ul class="menu-content">
              <li>
                <router-link
                  class="menu-item"
                  to="/users"
                  data-i18n="nav.page_layouts.1_column"
                  >المستخدمين</router-link
                >
              </li>

              <li>
                <router-link
                  class="menu-item"
                  to="/hodoor"
                  data-i18n="nav.page_layouts.2_columns"
                  >الحضور</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  to="/enseraf"
                  data-i18n="nav.page_layouts.3_columns.main"
                  >الإنصراف</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#"
              ><i class="la la-navicon"></i
              ><span class="menu-title" data-i18n="nav.navbars.main"
                >كل التقارير</span
              ></a
            >
            <ul class="menu-content">
              <li>
                <router-link
                  class="menu-item"
                  to="/report-user"
                  data-i18n="nav.navbars.nav_light"
                  >الحضور و الإنصراف</router-link
                >
              </li>

              <li>
                <router-link
                  class="menu-item"
                  to="/report-user"
                  data-i18n="nav.navbars.nav_light"
                  >الحضور و الإنصراف</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
  },
};
</script>
