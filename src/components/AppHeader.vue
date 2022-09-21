<template>
    <header id="header-main">
        <div class="header-main-top">
            <div class="pull-left">
                <a href="index.html" id="logo-small">
                    <h4>Stream</h4>
                    <h5>/admin</h5>
                </a>
            </div>
            <div class="pull-right">
                <a
                    href="#"
                    id="responsive-menu-trigger"
                    @click="toggleSideBar()">
                    <i class="fa fa-bars"></i>
                </a>
            </div>
        </div>
        <div class="header-main-bottom">
            <div class="pull-left">
                <b-breadcrumb>
                    <b-breadcrumb-item active class="text-capitalize">{{
                        $route.meta.header_text
                    }}</b-breadcrumb-item>
                    <!-- <b-breadcrumb-item active>Users</b-breadcrumb-item> -->
                </b-breadcrumb>
            </div>
            <!-- <div class="pull-right">
                <p>Version 1.0.0</p>
            </div> -->
        </div>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            sidebar_open: false,
        };
    },
    methods: {
        toggleSideBar() {
            if (!this.sidebar_open) {
                document.body.setAttribute("class", "sidebar-main-open");
            } else {
                document.body.classList.remove("sidebar-main-open");
            }
            this.sidebar_open = !this.sidebar_open;
        },
    },
    mounted() {},
};
</script>
