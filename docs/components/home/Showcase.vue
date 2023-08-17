<script lang="ts" setup></script>

<template>
  <div class="w-full">
    <div class="max-w-3/4 md:max-w-4xl mx-auto py-4 md:py-12 lg:py-12 text-center">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1>Showcase</h1>

        <p class="text-lg">Vue Flow is used in a variety of projects and applications. Here are some of them:</p>

        <div class="grid grid-cols-2 mt-8">
          <div class="flex flex-col justify-center">
            <div class="self-center w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden">
              <img src="/assets/octai.png" alt="Octai" />
            </div>

            <a href="https://octai.com" target="_blank">
              <h2 class="text-3xl mt-6 font-semibold text-[#2196f3]">Octai</h2>
            </a>

            <h3 class="text-lg">Machine Learning NoCode Platform for Data Scientists and Developers.</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
