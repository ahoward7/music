<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
        <nav class="container mx-auto flex justify-start items-center py-5 px-4">
        <!-- App Name -->
        <router-link :to="{ name: 'home' }" class="text-white font-bold uppercase text-2xl mr-4" exact-active-class="no-active">Music</router-link>

        <div class="flex flex-grow items-center">
            <!-- Primary Navigation -->
            <ul class="flex flex-row mt-1">
                <!-- Navigation Links -->
                <li>
                    <router-link :to="{ name: 'about' }" class="px-2 text-white">About</router-link>
                </li>
                <li v-if="!userLoggedIn">
                    <router-link :to="{ name: 'manage' }" class="px-2 text-white" @click.prevent="toggleAuthModal">Login / Register</router-link>
                </li>
                <template v-else>
                    <router-link class="px-2 text-white" :to="{ name: 'manage' }">
                        Manage
                    </router-link>
                    <li>
                        <a class="px-2 text-white" href="#" @click.prevent="signout">Logout</a>
                    </li>
                </template>
            </ul>
            <ul class="flex flex-row mt-1 ml-auto">
                <li>
                    <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
                        {{ currentLocale }}
                    </a>
                </li>
            </ul>
        </div>
        </nav>
    </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: "AppHeader",
    computed: {
        ...mapState(['userLoggedIn']),
        currentLocale() {
            return this.$i18n.locale === 'ru' ? 'Russian' : 'English';
        }
    },
    methods: {
        ...mapMutations(['toggleAuthModal']),
        signout() {
            this.$store.dispatch('signout', {
                router: this.$router,
                route: this.$route
            });

            if (this.$route.meta.requiresAuth) {
                this.$router.push({ name: 'home' })
            }
        },
        changeLocale() {
            this.$i18n.locale = this.$i18n.locale === 'ru' ? 'en' : 'ru';
        }
    },
}
</script>

<style>

</style>