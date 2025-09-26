<template>
  <div class="example-view">
    <div class="main-top flex flex-justify-between p-l-2 p-r-2">
      <div>
        <el-input
          v-model="inputStr"
          placeholder="Please Input"
          :suffix-icon="Search"
          @input="handleSearchInput"
        />
      </div>
      <div class="mt-xs ml-xl">
        <el-button
          type="primary"
          class="mt-xm"
          @click="handleClick"
        >
          搜索
        </el-button>
        <el-button>重置</el-button>
        <el-button
          type="danger"
          @click="handleDelete"
        >
          删除
        </el-button>
      </div>
    </div>
    <div class="main-content">
      <PaginationTable
        ref="pTableRef"
        :table-data="tableData"
        :total="total"
        :loading="loading"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
      >
        <!-- 自定义表格列 -->
        <template #table-columns>
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="id"
            label="ID"
            width="80"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="age"
            label="年龄"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
        </template>
      </PaginationTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import PaginationTable from '@/components/PaginationTable.vue';
import { debounce, throttle } from '@/utils';

const inputStr = ref('');

const loading = ref(false);
const total = ref(0);
const tableData = ref<User[]>([]);
const selectedRows = ref<User[]>([]);
// tableRef
const pTableRef = ref<InstanceType<typeof PaginationTable>>();
// 获取数据的方法
const fetchData = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await mockApi(page, size);

    tableData.value = response.data;
    total.value = response.total;
  } catch (error) {
    throw new Error(`获取数据失败: ${error}`);

    // 获取数据失败处理
  } finally {
    loading.value = false;
  }
};

// 处理分页变化
const handlePageChange = ({ page, size }: { page: number; size: number }) => {
  fetchData(page, size);
};
/**
 * 处理选择变化
 * @param val 选中的行数据
 */
const handleSelectionChange = (val: User[]) => {
  selectedRows.value = val;
  console.log('选中的行:', selectedRows.value);
};

/**
 * 模拟 API 请求
 * @param page 页码
 * @param size 每页数据量
 * @returns Promise<{ data: User[]; total: number }>
 */
const mockApi = (page: number, size: number): Promise<{ data: User[]; total: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Array.from({ length: size }, (_, i) => ({
        id: (page - 1) * size + i + 1,
        name: `用户 ${(page - 1) * size + i + 1}`,
        age: Math.floor(Math.random() * 30) + 20,
        address: `地址 ${i + 1}`
      }));

      resolve({
        data,
        total: 100 // 模拟总数据量
      });
    }, 500);
  });
};
const handleDelete = () => {
  console.log('pTableRef', pTableRef.value!.getSelectionRows());
  console.log('删除选中的行:', selectedRows.value);
};

const clickCount = ref(0);

// 防抖处理搜索输入
const handleSearchInput = debounce(() => {
  console.log('实际搜索:', inputStr.value);
  // 这里执行搜索API请求
}, 500);

// 节流处理搜索按钮点击
const handleClick = throttle(() => {
  clickCount.value += 1;
  console.log('按钮点击', clickCount.value);
}, 1000);

// 初始加载数据
onMounted(() => {
  fetchData(1, 10);
});
</script>

<style scoped lang="scss"></style>
