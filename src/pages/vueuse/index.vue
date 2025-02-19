<script setup lang="ts">
import { onKeyStroke, useBattery, useGeolocation, useMouse } from '@vueuse/core'

const { x, y } = useMouse()
const { level } = useBattery()
const { coords } = useGeolocation()

const key = ref({})

onKeyStroke(true, (e) => {
  e.preventDefault()
  key.value = e.key
})
</script>

<template>
  <div>
    <!-- useMouse -->
    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell>
        VueUse Demo
      </van-cell>
      <van-cell>
        X: {{ x }} Y: {{ y }}
      </van-cell>
      <van-cell>
        纬度: {{ coords.latitude }} &nbsp;&nbsp;&nbsp;&nbsp; 经度 : {{ coords.longitude }}
      </van-cell>
      <van-cell>
        键盘监听: {{ key }} 键
      </van-cell>
      <van-cell>
        电量：{{ (level / 1) * 100 }} %
      </van-cell>
    </VanCellGroup>
  </div>
</template>

<style lang="less" scoped>
:deep(.van-cell__value) {
  text-align: left;
}
</style>
