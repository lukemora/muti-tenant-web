<template>
  <div class="pagination-table">
    <!-- 表格区域 -->
    <el-table
      ref="paginationTableRef"
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <slot name="table-columns"></slot>
    </el-table>

    <!-- 分页区域 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="props.pageSizes"
        :layout="props.layout"
        :total="props.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableInstance } from 'element-plus';

const props = defineProps({
  tableData: {
    type: Array as () => any[],
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  pageSizes: {
    type: Array as () => number[],
    required: false,
    default: () => [10, 20, 50, 100]
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
});

const emits = defineEmits(['page-change', 'selection-change']);

const paginationTableRef = ref<TableInstance>();

const currentPage = ref(1);

// 每页显示数量
const pageSize = ref(props.pageSizes[0]);

// 处理页码变化
const handleCurrentChange = () => {
  emitPageChange();
};

// 处理每页数量变化
const handleSizeChange = () => {
  currentPage.value = 1;
  emitPageChange();
};

// 触发分页变化事件
const emitPageChange = () => {
  emits('page-change', {
    page: currentPage.value,
    size: pageSize.value
  });
};

/**
 * 处理table选择变化事件
 * @param val - 选中的值数组
 * @returns 无返回值
 */
const handleSelectionChange = (val: any[]) => {
  emits('selection-change', val);
};
// 获取已选表格数据
const getSelectionRows = () => {
  return paginationTableRef.value!.getSelectionRows();
};

defineExpose({
  getSelectionRows
});
</script>

<style scoped lang="scss">
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
