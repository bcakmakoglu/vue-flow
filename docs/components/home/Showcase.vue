<script lang="ts" setup></script>

<template>
  <div class="w-full">
    <div class="max-w-5/6 lg:max-w-7xl mx-auto py-4 md:py-12 lg:py-12 text-center">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1>Showcase</h1>

        <p class="text-lg">Vue Flow is used in a variety of projects and applications. Here are some of them:</p>

        <div class="flex flex-col md:flex-row justify-between items-center gap-12 mt-8">
          <div class="flex-1 flex flex-col justify-center">
            <div
              class="h-[200px] md:min-h-[300px] w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden"
            >
              <img class="object-cover h-full w-full" src="/assets/octai.png" alt="Octai" />
            </div>

            <a href="https://octai.com" target="_blank">
              <h2 class="text-3xl mt-6 font-semibold text-[#2196f3]">Octai</h2>
            </a>

            <h3 class="text-lg">A Machine-Learning NoCode platform using a node-based UI for Data Scientists and Developers.</h3>
          </div>

          <div class="flex-1 flex flex-col justify-center">
            <div
              class="h-[200px] md:min-h-[300px] w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden"
            >
              <img class="object-cover h-full w-full" src="/assets/kestra.webp" alt="Kestra" />
            </div>

            <a href="https://octai.com" target="_blank">
              <h2 class="text-3xl mt-6 font-semibold text-[#4b0aaa]">Kestra</h2>
            </a>

            <h3 class="text-lg">An open-source orchestrator that makes both scheduled and event-driven workflows easy.</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
