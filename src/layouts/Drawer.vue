<template>
  <q-layout view="hHh Lpr lff" style="min-height: 100vh">
    <q-header bordered class="bg-grey-3 q-px-md q-py-sm	">
      <q-toolbar class="row no-wrap fit ">
        <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
        <q-toolbar-title class="col-2">
          <router-link to="/">
            <div class="row items-center q-gutter-xs">
              <q-img width="60px" src="../assets/images/just_logo.png"></q-img>

              <div class=" text-weight-medium">
                <span>Thaiwork</span>
              </div>
            </div>
          </router-link>
        </q-toolbar-title>
        <q-toolbar-title class="col-6 q-gutter-md row text-caption text-capitalize text-dark text-weight-bold">
  
        </q-toolbar-title>
        <q-toolbar-title class="col-4 row justify-end items-center text-dark text-caption q-gutter-md">

          <div>
          
            <div class="text-grey-8">
              {{ companyStore.info.name }}
            </div>
            <span v-if="userStore.roleNumber == -1">{{ "Xin chào quản trị viên" }}</span>
          </div>
          
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="240" :breakpoint="500" bordered @mouseover="miniState = false"
      @mouseout="miniState = true" class="bg-grey-3">
      <q-list class="q-px-lg q-py-xl">

        <template v-for="(menuItem, index) in menuList" :key="'something'+index">
          <q-item @click="navigate(menuItem.link)" clickable active-class="text-negative active-class-drawer"
            :active="link.includes(menuItem.name)" v-ripple>
            <q-item-section>
              <div class="row q-gutter-sm items-center">

                <q-icon size="1em" :name="menuItem.icon" />

                <div class="text-caption text-weight-regular"> {{ menuItem.label }}</div>
              </div>
            </q-item-section>

          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>

      </q-list>
    </q-drawer>



    <q-page-container>
      <q-page class="q-pa-xl bg-grey-1">

        <slot></slot>
      </q-page>
    </q-page-container>

    <q-footer class="bg-dark text-white ">
      <!-- <Footer></Footer> -->
    </q-footer>

  </q-layout>

</template>
  
<script >
// import { ref, onMounted } from 'vue'
import { useSearchStore } from "@/stores/searchStore"
import { useUserStore } from "@/stores/userStore"
import { useCompanyStore } from "../stores/companyStore"

import { logout } from "@/apis/auth"
import Footer from "./Footer.vue"
import { useJobStore } from '../stores/jobStore'
import { useRoleStore } from '../stores/roleStore'
// import JustLogo from '../assets/images/just_logo.png'
export default {
  components: {
    Footer,
  },
  data() {
    return {
      // JustLogo: JustLogo,
      drawer: false,
      miniState: true,
      menuList: [],
      link: this.$route.name,
      searchStore: useSearchStore(),
      jobStore: useJobStore(),
      roleStore: useRoleStore(),
      userStore: useUserStore(),
      companyStore: useCompanyStore(),
      searchStore: useSearchStore(),
      navigateHeader: [
        {
          label: "Trang chủ",
        },
        {
          label: "Tìm việc",
        },
        {
          label: "Doanh nghiệp",
        },
        {
          label: "Ứng viên",
        },
      ]
    }
  },
  watch: {
    "$route.name"(newValue, oldValue) {
      // console.log(newValue);
      this.link = newValue;
    },


  },
  created() {
    this.setDrawer()

  },
  methods: {
 
    navigate(link) {

      if (link == 'logout') {
        // logout().then(data => {
        //   if (data) {
        localStorage.removeItem("session")
        this.userStore.$reset();
        this.jobStore.$reset()
        this.roleStore.$reset()
        this.companyStore.$reset()
        this.searchStore.$reset()
        logout()
        this.$router.push('/dang-nhap')
        
        // }
        // })
      } else {

        this.$router.push(link)
      }
      // console.log("navigate")
    },
    setDrawer() {
      this.menuList = [
        {
          icon: `space_dashboard`,
          label: 'Tổng quan',
          separator: false,
          link: "/",
          name: "Dashboard"
        },
        {
          icon: `work`,
          label: 'Quản lý doanh nghiệp',
          separator: false,
          link: "/company/management",
          name: "Company Management"
        },

        {
          icon: `logout`,
          label: 'Đăng xuất',
          separator: false,
          link: "logout",
          name: "Log out"
        },
      ]

    }
  }
}


</script>

<style lang="scss" scoped>
.active-class-drawer {
  background: $negative-opacity-20;
  background-color: 0.2;
  border-radius: 0.5em;

};

</style>