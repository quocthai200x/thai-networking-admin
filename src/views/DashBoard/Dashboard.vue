<template >
  <div>DASH BOARD THỐNG KÊ SAU</div>

</template>
<script>

import DrawerVue from '../../layouts/Drawer.vue'



export default {

    data() {
        return {
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)

    },
    methods: {
        init() {

        },

    },


}

</script>
<style lang="scss"></style>