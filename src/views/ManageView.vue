<template>
    <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
            <upload-file ref="upload" :addSong="addSong"></upload-file>
        </div>
        <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                <span class="card-title">{{ $t('manage.my_songs') }}</span>
                <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
                </div>
                <div class="p-6">
                    <!-- Composition Items -->
                    <composition-item v-for="(song, i) in songs" :key="song.docID" :song="song" :updateSong="updateSong" :index="i" :removeSong="removeSong" :updateUnsavedFlag="updateUnsavedFlag"></composition-item>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>

<script>
import UploadFile from '../components/UploadFile'
import CompositionItem from '../components/CompositionItem'
import { songsCollection, auth } from '../includes/firebase'

export default {
    name: 'manageView',
    components: {
        UploadFile,
        CompositionItem
    },
    data() {
        return {
            unsavedFlag: false,
            songs: [],
        }
    },
    methods: {
        updateSong(i, values) {
            this.songs[i].modified_name = values.modified_name;
            this.songs[i].genre = values.genre;
        },
        removeSong(i) {
            this.songs.splice(i, 1);
        },
        addSong(doc) {
            const song = {
                ...doc.data(),
                docID: doc.id,
            };

            this.songs.push(song);
        },
        updateUnsavedFlag(value) {
            this.unsavedFlag = value;
        }
    },
    async created() {
        const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

        snapshot.forEach(this.addSong)
    },
    beforeRouteLeave(to, from, next) {
        if (!this.unsavedFlag) {
            next();
        }
        else {
            const leave = confirm('You have unsaved chanages. Are you sure you want to leave?');
            next(leave);
        }
    }
}
</script>
