<template>
    <div class="container">
        <p
            v-if="isLoading"
            class="loading"
        >Posts loading...</p>
        <template v-else>
            <div
                class="topbar"
                :class="{ open: pageOffset > 120 }"
            >
                <div class="container content">
                    <h3>User #{{ id }} posts</h3>
                    <span class="count">{{ count }} items</span>
                </div>
            </div>
            <h1>User #{{ id }} posts</h1>
            <span class="count">{{ count }} items</span>
            <div
                v-for="post in posts"
                :key="post.id"
                class="box"
            >
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
            </div>
        </template>
    </div>
</template>

<script>
import { fetchUserPosts } from '@/api'

export default {
    props: {
        id: Number
    },
    data() {
        return {
            isLoading: true,
            pageOffset: 0,
            posts: []
        }
    },
    watch: {
        id: {
            handler: 'fetch',
            immediate: true
        }
    },
    mounted() {
        window.addEventListener('scroll', this.update)
    },
    destroyed() {
        window.removeEventListener('scroll', this.update)
    },
    methods: {
        async fetch() {
            this.isLoading = true
            this.posts = await fetchUserPosts(this.id)
            this.isLoading = false
        },
        update() {
            this.pageOffset = window.pageYOffset
        }
    },
    computed: {
        count() {
            return this.posts.length
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    padding: 0.5em 1.5em;
    margin: 1em 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background: #fff;
}
.count {
    background: #48d8bb;
    padding: 4px 10px;
    font-size: 14px;
    border-radius: 100px;
    color: #fff;
}
.loading {
    text-align: center;
}
.topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: hidden;
    background: #fff;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    max-height: 0;
    transition: all 0.5s ease-out;

    &.open {
        max-height: 100px;
    }
    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
