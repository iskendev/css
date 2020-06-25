let app = new Vue({
  el: '#app',
  data: {
    name: 'Iskender Chinaliev',
    infoBlock: 'about',
    isActive: 'about'
  },
  methods: {
    setInfoBlock(block) {
      this.infoBlock = block;
      this.isActive = block;
    }
  }
})