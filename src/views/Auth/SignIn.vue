<template >
    <div class="bg-blue row window-height">

        <div class="col-4  q-padding">

            <div class="text-white grad flex q-pa-lg fit col justify-center items-center">
                <div class="flex justify-center items-center">

                    <div class="q-mb-xl">
                        <q-img width="200px" src="../../assets/images/logo.png"></q-img>
                    </div>
                    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable
                        animated infinite :autoplay="autoplay" control-color="white" navigation padding height="500px"
                        class="bg-none text-white ">
                        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                            <q-btn v-if="active" size="xs" :icon="btnProps.icon" color="white" flat round dense
                                @click="onClick" />
                            <q-btn v-else size="xs" :icon="btnProps.icon" class="btn-non-active" flat dense
                                @click="onClick" />
                        </template>

                        <q-carousel-slide :name="1" class="column no-wrap">
                            <div class="block justify-center items-center q-mb-md ">
                                <div class="flex justify-center items-center q-mb-md">
                                    <q-img class="rounded-borders" rounded-borders fit="fill" :ratio="16 / 9" width="200px"
                                        src="../../assets/images/login_banner_1.png"></q-img>
                                </div>
                                <div class="text-center text-subtitle2">
                                    <span>Giọng nói thành Văn bản</span>
                                </div>
                                <div class="text-center text-caption text-grey-6">
                                    <i>
                                        <span>Chúng tôi hỗ trợ lưu trữ và quản lí tất cả CV ứng tuyển</span>
                                    </i>
                                </div>
                            </div>
                            <div class="block justify-center items-center  q-mb-md ">
                                <div class="flex justify-center items-center q-mb-md">
                                    <q-img class="rounded-borders" rounded-borders fit="fill" :ratio="16 / 9" width="200px"
                                        src="../../assets/images/login_banner_2.png"></q-img>
                                </div>
                                <div class="text-center text-subtitle2">
                                    <span>Tất cả CV tại 1 nơi</span>
                                </div>
                                <div class="text-center text-caption text-grey-6">
                                    <i>
                                        <span>Chúng tôi hỗ trợ lưu trữ và quản lý tất cả CV, kể cả những CV tải lên hoặc
                                            từ những website khác.</span>
                                    </i>
                                </div>
                            </div>
                        </q-carousel-slide>
                        <q-carousel-slide :name="2" class="column no-wrap flex-center">
                            <div class="block justify-center items-center q-mb-md ">
                                <div class="flex justify-center items-center q-mb-md">
                                    <q-img class="rounded-borders" rounded-borders fit="fill" :ratio="16 / 9" width="200px"
                                        src="../../assets/images/login_banner_3.png"></q-img>
                                </div>
                                <div class="text-center text-subtitle2">
                                    <span>Đánh giá và So sánh</span>
                                </div>
                                <div class="text-center text-caption text-grey-6">
                                    <i>
                                        <span>Đánh giá ứng viên và so sánh các ứng viên với nhau để tìm ra người phù hợp
                                            nhất.</span>
                                    </i>
                                </div>
                            </div>
                            <div class="block justify-center items-center  q-mb-md ">
                                <div class="flex justify-center items-center q-mb-md">
                                    <q-img class="rounded-borders" rounded-borders fit="fill" :ratio="16 / 9" width="200px"
                                        src="../../assets/images/login_banner_4.png"></q-img>
                                </div>
                                <div class="text-center text-subtitle2">
                                    <span>Hệ thống quản lí ứng viên</span>
                                </div>
                                <div class="text-center text-caption text-grey-6">
                                    <i>
                                        <span>Quản lý hồ sơ ứng viên chỉ với thao tác kéo-thả trên giao diện thân thiện
                                            với nhiều tính năng hữu ích.</span>
                                    </i>
                                </div>
                            </div>

                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
        </div>
        <div class="col-8  ">
            <div class="flex column	 fit justify-center items-center  bg-grey-1">
                <div class="" style="width: 50%;">
                    <div class="text-bold text-h5 q-mb-lg">
                        <span>Đăng nhập quản trị viên hệ thống</span>
                    </div>
                    <div class="q-my-xl q-gutter-md">

                        <div class="">
                            <div class="text-bold">
                                <span>Tài khoản đăng nhập <span class="text-negative">*</span></span>
                            </div>
                            <div>
                                <q-input type="email" color="negative" v-model="email" outlined dense></q-input>
                            </div>
                        </div>
                        <div>
                            <div class="text-bold">
                                <span>Mật khẩu <span class="text-negative">*</span></span>
                            </div>
                            <div>
                                <q-input :type="isPwd ? 'password' : 'text'" color="negative" v-model="password" outlined
                                    dense>
                                    <template v-slot:append>
                                        <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer" @click="isPwd = !isPwd" />
                                    </template></q-input>
                            </div>
                        </div>
                        <div class="text-negative">
                            <i>
                                <span>{{ message }}</span>
                            </i>
                        </div>

                    </div>

                    <div class=" float-right ">
                        <div class="flex column q-gutter-md">

                            <div class="flex justify-end">

                                <q-btn :disable="loading" unelevated label="Đăng nhập" color="negative"
                                    @click="submitLogin"></q-btn>

                            </div>
         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login, getMe, resetHeaderAndLocal } from "../../apis/auth"
import { ref } from 'vue';
import { roleDictionary } from '../../assets/dictionary/role';
import { useUserStore } from '../../stores/userStore';
import { useCompanyStore } from '../../stores/companyStore';
import { useRoleStore } from "../../stores/roleStore"
import LayoutFakeVue from '../../layouts/LayoutFake.vue';
import { useJobStore } from '../../stores/jobStore';




export default {
    data() {
        return {

            jobStore: useJobStore(),
            slide: ref(1),
            autoplay: ref(true),
            email: "",
            password: "",
            isPwd: true,
            loading: false,
            message: "",
            userStore: useUserStore(),
            companyStore: useCompanyStore(),
            roleStore: useRoleStore(),
        }
    },
    created() {
        this.$emit("update:layout", LayoutFakeVue)
    },
    methods: {
        submitLogin() {
            this.loading = true;
            if (this.password && this.email && this.validateEmail(this.email)) {
                try {
                    login({ email: this.email, password: this.password }).then(data => {
                        if (data) {
                            getMe().then(user => {
                                if (user) {
                                    let { email, _id, info, activity, roleNumber, createdAt, updatedAt, } = user.user;
                                    if (user && (roleDictionary.isAdminSystem(roleNumber))) {
                                        this.userStore.setState({ email, _id, info, activity, roleNumber, createdAt, updatedAt })
                                        this.roleStore.setAdminRole()
                                        this.loading = false;
                                        this.message = ""
                                        this.$router.push("/")
                                    } else {
                                        this.message = "Tài khoản không là tài khoản hệ thống"
                                        this.loading = false;

                                        throw new Error("wrong role of user")
                                    }
                                } else {
                                    this.message = "Đăng nhập thất bại"
                                    this.loading = false;

                                    throw new Error("cant get user")
                                }
                            })
                        } else {
                            this.loading = false;

                            throw new Error("cant get user")
                        }
                    })
                } catch (error) {

                    this.loading = false;
                    resetHeaderAndLocal()
                }

            } else {
                this.message = "Hãy điền đầy đủ thông tin"
                this.loading = false;
            }
        },
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
    }
}
</script>
<style lang="scss">
.grad {
    background-image: linear-gradient(to bottom right, $dark 1%, $negative );
}

.bg-none {
    background-color: rgba(0, 0, 0, 0);
}

.btn-non-active {
    color: rgba(0, 0, 0, 1);
}

.hover:hover {
    color: $negative;
    transition: ease-in-out 200ms;
}
</style>