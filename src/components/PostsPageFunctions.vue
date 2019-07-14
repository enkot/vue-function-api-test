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
import {
    value,
    watch,
    computed,
    onMounted,
    onUnmounted
} from 'vue-function-api'
import { fetchUserPosts } from '@/api'

function useScroll() {
    const pageOffset = value(0)
    const update = () => {
        pageOffset.value = window.pageYOffset
    }

    onMounted(() => window.addEventListener('scroll', update))
    onUnmounted(() => window.removeEventListener('scroll', update))

    return { pageOffset }
}

function useUserPostsFetch(props) {
    const isLoading = value(false)
    const posts = value([])

    watch(
        () => props.id,
        async id => {
            isLoading.value = true
            posts.value = await fetchUserPosts(id)
            isLoading.value = false
        }
    )

    return { isLoading, posts }
}

export default {
    props: {
        id: Number
    },
    setup(props) {
        const { isLoading, posts } = useUserPostsFetch(props)
        const count = computed(() => posts.value.length)

        return {
            ...useScroll(),
            isLoading,
            posts,
            count
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
