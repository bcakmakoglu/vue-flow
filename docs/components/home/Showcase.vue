<script lang="ts" setup></script>

<template>
  <section
    id="showcase"
    class="border-t-1 border-secondary w-full text-white bg-gradient-to-br from-secondary-500 to-secondary-100 dark:(!bg-none)"
  >
    <div class="max-w-5/6 2xl:max-w-7xl mx-auto py-12 md:py-16">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-center">Putting Ideas into Action - The Showcase</h1>

        <p class="font-medium max-w-3/4 text-center">
          Whether you're a seasoned developer or just starting your journey with Vue Flow, this showcase offers inspiration and
          insights into what's possible. Dive in and discover the potential of Vue Flow for your next project.
        </p>

        <div
          class="divide-y divide-secondary md:divide-y-0 flex flex-col md:flex-row justify-between items-start gap-12 mt-8 text-center md:text-left"
        >
          <div class="flex-1 flex flex-col items-center md:items-start">
            <div
              class="h-[200px] md:min-h-[300px] w-full shadow-xl rounded-xl font-mono uppercase border-1 border-gray overflow-hidden"
            >
              <img class="object-cover h-full w-full" src="/assets/n8n.webp" alt="n8n" />
            </div>

            <div class="px-1">
              <a href="https://n8n.io" target="_blank">
                <h2 class="text-3xl mt-6 font-semibold inline-block">n8n</h2>
              </a>

              <h3 class="text-lg">
                n8n is an open-source workflow automation platform that lets you connect apps, APIs, and services to create
                automated processes using a visual, node-based interface.
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

              <h3 class="text-lg">
                Kestra is an open-source, declarative orchestration and workflow automation platform that enables you to define,
                schedule, and govern complex processes as code (YAML) with UI support.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
