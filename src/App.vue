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
import { fetchUserPosts } from '@/api'

import PostsPageOptions from '@/components/PostsPageOptions'
import PostsPageFunctions from '@/components/PostsPageFunctions'

const withPostsHOC = WrappedComponent => ({
    props: WrappedComponent.props,
    data() {
        return {
            postsIsLoading: false,
            fetchedPosts: []
        }
    },
    watch: {
        id: {
            handler: 'fetchPosts',
            immediate: true
        }
    },
    methods: {
        async fetchPosts() {
            this.postsIsLoading = true
            this.fetchedPosts = await fetchUserPosts(this.id)
            this.postsIsLoading = false
        }
    },
    computed: {
        postsCount() {
            return this.fetchedPosts.length
        }
    },
    render(h) {
        return h(WrappedComponent, {
            props: {
                ...this.$props,
                isLoading: this.postsIsLoading,
                posts: this.fetchedPosts,
                count: this.postsCount
            }
        })
    }
})

export default {
    name: 'app',
    components: {
        PostsPageOptions: withPostsHOC(PostsPageOptions),
        PostsPageFunctions
    },
    data() {
        return {
            currentUser: 1,
            functional: true
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
