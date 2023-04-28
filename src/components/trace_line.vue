<template>
  <div class="trace_line">
    <span class="line-label">
      {{label}}<span v-if="label">:</span>
    </span>
    <span class="line-value">
      {{value}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'trace_line',
  props: ['label', 'value'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  /*@import "./decode.css";*/
  .trace_line {
    background-color: #fff;
    font-size: 0.875rem;
    margin-bottom: 0.9375rem;
    display: flex;
    justify-content: space-between;
    .line-label{
      color: #999;
      width:80px;
      flex-shrink: 0;
    }
    .line-value{
      float: right;
    }
  }
</style>
