<script lang="ts" setup></script>

<template>
  <div
    class="border-t-1 border-secondary w-full text-white bg-gradient-to-br from-secondary-500 to-secondary-100 dark:(!bg-none)"
  >
    <div class="max-w-5/6 2xl:max-w-7xl mx-auto py-12 md:py-16">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1>Putting Ideas into Action: The Showcase</h1>

        <p class="font-medium max-w-3/4 text-center">
          Whether you're a seasoned developer or just starting your journey with Vue Flow, this showcase offers inspiration and
          insights into what's possible. Dive in and discover the potential of Vue Flow for your next project.
        </p>

        <div
          class="divide-y divide-secondary md:divide-y-0 flex flex-col md:flex-row justify-between items-center gap-12 mt-8 text-center md:text-left"
        >
          <div class="flex-1 flex flex-col items-center md:items-start">
            <div
              class="h-[200px] md:min-h-[300px] w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden"
            >
              <img class="object-cover h-full w-full" src="/assets/octai.png" alt="Octai" />
            </div>

            <div class="px-1">
              <a href="https://octai.com" target="_blank">
                <h2 class="text-3xl mt-6 font-semibold inline-block">Octai</h2>
              </a>

              <h3 class="text-lg">
                A Machine-Learning NoCode platform using a node-based UI for Data Scientists and Developers.
              </h3>
            </div>
          </div>

          <div class="pt-12 md:pt-0 flex-1 flex flex-col justify-center">
            <div
              class="h-[200px] md:min-h-[300px] w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden"
            >
              <img class="object-cover h-full w-full" src="/assets/kestra.webp" alt="Kestra" />
            </div>

            <div class="px-1">
              <a href="https://kestra.io" target="_blank">
                <h2 class="text-3xl mt-6 font-semibold inline-block">Kestra</h2>
              </a>

              <h3 class="text-lg">An open-source orchestrator that makes both scheduled and event-driven workflows easy.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
