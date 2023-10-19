export default defineNuxtConfig({
  modules:['@vite-pwa/nuxt'],
  css: ['~/assets/css/custom-styles.css'],
  pwa:{
    manifest:{
      name:"Nuxt3 PWA",
      short_name:"Nuxt3 PWA",
      description:"Nuxt 3 PWA ",
      icons:[
        {
          src: '/insigture144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
      ],
      screenshots:[
        {
          src: "icons/CompressJPEG.online_500x500-image.png",
          sizes: "500x500",
          type: "image/png",
          form_factor: "narrow"
        },
        {
          src: "icons/600x400.png",
          sizes: "600x400",
          type: "image/png",
          form_factor: "wide"
        },
      ]
    },
    workbox:{
      navigateFallback:'/'
    },
    devOptions:{
      enabled:true,
      type:"module"
    }
  },
})
