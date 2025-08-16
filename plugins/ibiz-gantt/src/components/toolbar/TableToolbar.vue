<template>
  <div class="xg-table-toolbar">
    <el-popover placement="bottom" trigger="click" :teleported="true">
      <template #reference>
        <el-button title="设置"
          ><ion-icon name="settings-outline"></ion-icon
        ></el-button>
      </template>
      <template #default>
        <template v-for="r in $slotsBox.tableHeaders.headers">
          <el-checkbox
            v-for="c in r"
            :key="c.uuid"
            v-model="c.show"
            :label="c.label"
          />
        </template>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import useSlotsBox from '@/composables/useSlotsBox';
const { $slotsBox } = useSlotsBox();
</script>
<style lang="scss">
.xg-table-toolbar {
  .el-button {
    font-size: 20px;
  }
}
</style>
