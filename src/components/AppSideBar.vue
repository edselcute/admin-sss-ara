<template>
    <div>
        <div class="sidebar-logo">
            <a href="index.html" id="logo-big">
                <h1>Stream</h1>
                <h2>/admin</h2>
            </a>
        </div>

        <div class="sidebar-module">
            <div class="sidebar-profile">
                <img
                    src="@/assets/karma/images/icons/social/32/favicon-32x32.png"
                    alt
                    class="avatar" />

                <ul class="sidebar-profile-list">
                    <li>
                        <h3>admin</h3>
                    </li>
                    <li>
                        <a href="#">Account</a> |
                        <a
                            href="javascript:void(0)"
                            @click.prevent="logoutUser()"
                            >Logout</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="sidebar-line"></div>

        <ul class="ext-tabs-sidebar">
            <li :class="`${tab == 1 ? 'active' : ''}`">
                <a href="#sidebar-tab-1" @click.prevent="tab = 1">
                    <i class="fa fa-bars"></i> Navigation
                </a>
            </li>
            <li :class="`${tab == 2 ? 'active' : ''}`">
                <a href="#sidebar-tab-2" @click.prevent="tab = 2"
                    ><i class="fa fa-edit"></i> Note</a
                >
            </li>
            
        </ul>
        <div class="tab-content">
            <div
                id="sidebar-tab-1"
                :class="`tab-pane ${tab == 1 ? 'active' : ''} clearfix`">
                <div class="sidebar-module">
                    <nav class="sidebar-nav-v2">
                        <ul>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/administrators'
                                        ? 'page-arrow'
                                        : ''
                                }`">
                                <router-link to="/console/administrators">
                                    <i class="fa fa-user-md"></i> Administrator
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/stream-group'
                                        ? 'page-arrow'
                                        : ''
                                }`">
                                <router-link to="/console/stream-group">
                                    <i class="fa fa-th-large"></i>
                                    Stream Group
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/stream'
                                        ? 'page-arrow'
                                        : ''
                                }`">
                                <router-link to="/console/stream">
                                    <i class="fa fa-caret-square-o-right"></i>
                                    Stream
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/domain'
                                        ? 'page-arrow'
                                        : ''
                                }`">
                                <router-link to="/console/domain">
                                    <i class="fa fa-link"></i>
                                    Domain
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/log'
                                        ? 'page-arrow'
                                        : ''
                                }`">
                                <router-link to="/console/log">
                                    <i class="fa fa-eye"></i>
                                    Activity Log
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div
                id="sidebar-tab-2"
                :class="`tab-pane ${tab == 2 ? 'active' : ''} clearfix`">
                <div class="sidebar-module">
                    <textarea
                        id="note"
                        class="form-control noresizing"
                        placeholder="Note"
                        required=""
                        aria-required="true"></textarea>
                    <div class="spacer-10"></div>
                    <button
                        class="btn btn-block btn-primary"
                        onclick="save_note()">
                        Save
                    </button>
                </div>
            </div>
        </div>

        <div class="sidebar-line"></div>
        <div class="sidebar-module">
            <h3 class="text-center">Toggle Watermark</h3>
            <br />
            <div class="toggle-options">
                <b-form-checkbox v-model="auto_position" disabled
                    >Position Auto</b-form-checkbox
                >
                <b-form-input
                    id="color"
                    type="color"
                    v-model="toggle_color"></b-form-input>
            </div>
            <div class="toggle-positions mt-2">
                <b-button
                    @click="selectPostion(5)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 5 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Top Left</b-button
                >
                <b-button
                    @click="selectPostion(1)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 1 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Top</b-button
                >
                <b-button
                    @click="selectPostion(6)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 6 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Top Right</b-button
                >
                <b-button
                    @click="selectPostion(3)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 3 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Left</b-button
                >
                <b-button
                    @click="selectPostion(0)"
                    :disabled="auto_position"
                    block
                     :variant="toggle_position == 0 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Center</b-button
                >
                <b-button
                    @click="selectPostion(4)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 4 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Right</b-button
                >
                <b-button
                    @click="selectPostion(7)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 7 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Bottom Left</b-button
                >
                <b-button
                    @click="selectPostion(2)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 2 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Bottom</b-button
                >
                <b-button
                    @click="selectPostion(8)"
                    :disabled="auto_position"
                    block
                    :variant="toggle_position == 8 ? 'secondary' : 'default'"
                    style="height: 50px">
                    Bottom Right</b-button
                >
            </div>

            <div class="spacer-15"></div>

            <div style="width: 100%">
                
                <b-button
                    pi
                    variant="primary"
                    style="height: 30px"
                    class="w-100"
                    @click="toggleUserData(1)">
                    Show</b-button
                >
                <b-button
                    pi
                    variant="default"
                    style="height: 30px"
                    class="w-100"
                    @click="toggleUserData(0)">
                    Hide</b-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
// import Pusher from "pusher";
import Pusher from "pusher-js";
var a = "aaa";
export default {
    name: "AppSideBar",
    data() {
        return {
            tab: 1,
            auto_position: false,
            toggle_color: "#FFFFFF",
            toggle_position: 0,
        };
    },
    methods: {
        ...mapActions("auth", {
            authLogout: "logoutUser",
        }),
        ...mapActions("sitepref", {
            siteprefUpdate: "update",
        }),
        
        selectPostion(val) {
            this.toggle_position = val;
        },
        async logoutUser() {
            var vm = this;
            const res = await vm.authLogout();
            vm.$router.push("/auth").catch(() => {});
        },
        async toggleUserData(on) {
            var vm = this;
        // Updating the value of the toggle_user_data in the database.
            const res = await vm.siteprefUpdate({
                position: vm.toggle_position,
                key: "toggle_user_data",
                value: on,
            });

            if(res.data.status == 2) {
                vm.$bvToast.toast(`Toggled User Data  ${on?'On':'Off'}`, {
                        title: `Success`,
                        toaster: `b-toaster-top-right`,
                        solid: true,
                        variant: "warning",
                        appendToast: true,
                    });
            }
        },
    },
    mounted() {
        
    },
};
</script>

<style>
.toggle-positions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
    margin: 1em 0;
}

.toggle-positions > button {
    font-size: 12px;
}

.toggle-options {
    display: grid;
    grid-template-columns: 4fr 1fr;
}

.custom-control {
    padding: 0 !important;
}
.custom-control-label {
    margin-left: 5px;
    font-size: 15px !important;
}
#color {
    height: 26px;
}
</style>
