<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="well">
        <div class="flex-between-center" @click="toggleSection()">
          <h2 class="h3"><b>{{title}}</b> {{subtitle}}</h2>
          <span :class="toggleIconClass"></span>
        </div>
        <div v-if="showSection">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CollapseSection",
    props: [
        "title",
        "subtitle",
    ],
    data() {
      return {
        showSection: false,
      }
    },
    computed: {
      toggleIconClass() {
        return (this.showSection ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down')
      }
    },
    methods: {
      toggleSection() {
        this.showSection = !this.showSection;
      },
    }
  }
</script>