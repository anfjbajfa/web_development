<template>
    <navbar/>
    <div class="fade-bg">
        

        <div class="relative pb-9" data-carousel="slide">
            <!-- Carousel wrapper -->
            <div class="relative h-96 w-full overflow-hidden sm:h-70 xl:h-120 2xl:h-150">
                <!-- Item 1 -->

                <div :id="_key" class="hidden duration-700 ease-in-out" v-for="_key in Object.keys(data)">
                    <img :src="'/' + _key + '.webp'"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                </div>

            </div>

            <div class="relative flex justify-center gap-2 pt-8">
                <button :id="_key + '_i'" type="button" class="w-3 h-3 rounded-full "
                    v-for="_key in Object.keys(data)"></button>

            </div>

        </div>

        <!-- 文字部分 -->
        <div class="flex justify-center  w-full ">
            <div class="p3">

                <Transition v-show="!will_change.state" name="slide-fade" appear>
                    <div>
                        <h1
                            class="text-center mb-4 text-blue-900 text-lg font-extrabold leading-none tracking-tight sm:text-4xl lg:text-5xl dark:text-white">
                            {{ header.title }}</h1>
                        <p
                            class="text-center mb-6 text-blue-800 text-sm font-normal sm:text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">
                            {{ header.description }}</p>

                        

                    </div>

                </Transition>
            </div>

            
        </div>

        <div>
            <Transition v-show="!will_change.state" name="slide-fade" appear>
            <div class="ml-20 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg w-72 h-100">
                            <!-- 这是固定位置的内容 -->
                            <h2 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">最新公告</h2>
                            <p class="mb-1"><a href="" class="text-blue-600 hover:underline dark:text-blue-400">临平项目</a>
                            </p>
                            <p class="mb-1"><a href="" class="text-blue-600 hover:underline dark:text-blue-400">乔司项目</a>
                            </p>
                            <p class="mb-1"><a href="" class="text-blue-600 hover:underline dark:text-blue-400">东湖项目</a>
                            </p>
            </div>
        </Transition>
        </div>



    </div>

</template>



<script setup>
import { reactive, onMounted } from 'vue';
import { Carousel } from 'flowbite'
import { useStore } from 'vuex';
import navbar from '../components/navbar.vue';

let if_initial = true

let current = reactive({ active: -1 })
let will_change = reactive({ state: false })
let header = reactive({ title: "", description: "" })

const store = useStore()
let data = store.state.homeData

let index_ = {}
for (let i in data) {
    let p = Object.keys(data).indexOf(i)
    index_[p] = data[i]

}


onMounted(() => {
    carousel_creator()
})



function carousel_creator() {
    const items = []
    const items_i = []

    for (let i in data) {
        let p = Object.keys(data).indexOf(i)
        let x = {
            position: p,
            el: document.getElementById(i)
        }
        let y = {
            position: p,
            el: document.getElementById(i + "_i")
        }
        items.push(x)
        items_i.push(y)
    }

    const options = {
        defaultPosition: 0,
        interval: 6000,

        indicators: {
            activeClasses: 'bg-blue-500 dark:bg-gray-800',
            inactiveClasses: 'bg-blue-300 dark:bg-gray-800/50 hover:bg-green-400 dark:hover:bg-gray-800',
            items: items_i
        },
        onChange: (instance) => {
            // handle_heading_animation(350)
            will_change.state = !will_change.state
            if (if_initial) {
                current.active = instance._activeItem.position
                header.title = index_[current.active].title
                header.description = index_[current.active].description
                will_change.state = !will_change.state
                if_initial = false

            }
            else {
                setTimeout(() => {
                    current.active = instance._activeItem.position
                    header.title = index_[current.active].title
                    header.description = index_[current.active].description
                    will_change.state = !will_change.state
                }, 455)
            }


        }
    }


    let carousel = new Carousel(items, options)

    carousel.cycle()


}

</script>



<style scoped>
.slide-fade-enter-active {
    animation: fadeIn .45s;
}

@keyframes fadeIn {
    0% {
        opacity: .25;
    }

    100% {
        opacity: 1;
    }
}


.slide-fade-leave-active {
    animation: fadeOut .45s;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}


.fade-bg {
    animation: fadeIn 3s;
    min-height: 100vh;
    height: 1200px;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>