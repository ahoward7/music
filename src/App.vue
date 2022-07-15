<template>
    <app-header></app-header>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component"></component>
        </transition>
    </router-view>
    <music-player></music-player>
    <auth-modal></auth-modal>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AuthModal from './components/AuthModal.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
    name: 'App',
    components: {
        AppHeader,
        AuthModal,
        MusicPlayer
    },
    created() {
        this.$store.dispatch('init_login');
    }
}
</script>

<style>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s linear;
}

.fade-leave-to {
    transition: all 0.5s linear;
    opacity: 0;
}
</style>
