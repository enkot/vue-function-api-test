<template>
    <div id="app">
        <PostsPageFunctions
            v-if="functional"
            :id="currentUser"
        />
        <PostsPageOptions
            v-else
            :id="currentUser"
        />
    </div>
</template>

<script>
import PostsPageOptions from '@/components/PostsPageOptions'
import PostsPageFunctions from '@/components/PostsPageFunctions'

export default {
    name: 'app',
    components: {
        PostsPageOptions,
        PostsPageFunctions
    },
    data() {
        return {
            currentUser: 1,
            functional: false
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap');

body {
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 40px 0;
    color: #555;
    background: #f6f5f8;
}
h1,
h2,
h3 {
    color: #333;
}
.container {
    max-width: 40em;
    padding: 0 1.5rem;
    margin: 0 auto;
}
</style>
