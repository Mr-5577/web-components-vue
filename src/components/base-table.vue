<template>
  <div class="pro-table">
    <el-table
      ref="proTableRef"
      v-loading="tableLoading"
      element-loaading-text="数据加载中..."
      :data="tableData"
      :row-key="rowKey"
      :border="showBorder"
      :height="tableHeight"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="tableHerderCellStyle"
      @selection-change="handleSelectChange"
    >
      <!-- 复选框 -->
      <el-table-column type="selection" width="55" v-if="showSelection" />
      <!-- 序号 -->
      <el-table-column label="序号" type="index" width="55" v-if="showIndex">
        <template slot-scope="scope">
          <!-- 有分页时序号显示 -->
          <span v-if="pagination">
            {{ (pagination.current - 1) * pagination.size + scope.$index + 1 }}
          </span>
          <!-- 无分页时序号显示 -->
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(col, index) in tableColum">
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :show-overflow-tooltip="showTooltip"
        >
          <!-- 多行表头 -->
          <template v-for="(subCol, subIndex) in col.multiList">
            <slot v-if="subCol.slot" :name="subCol.slot" />
            <el-table-column
              v-else
              :key="subIndex"
              :prop="subCol.prop"
              :label="subCol.label"
              :width="subCol.width"
            ></el-table-column>
          </template>
        </el-table-column>
      </template>
      <!-- 暂无数据 -->
      <template slot="empty">
        <el-empty :description="'暂无内容'" :image-size="200"></el-empty>
      </template>
    </el-table>
    <!-- 分页 -->
    <div v-if="pagination" class="pager-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pageSizes"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-table",
  props: {
    // 列表数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 列表columns
    tableColum: {
      type: Array,
      default: () => [],
    },
    // 加载Loading
    tableLoading: {
      type: Boolean,
      default: false,
    },
    // 行数据Key,默认为id
    rowKey: {
      type: String,
      default: "id",
    },
    // 分页  current:当前页 size:页面展示条数 total:总数
    pagination: {
      type: Object,
      default: null,
    },
    // 每页显示个数选项
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    //是否展示序号
    showIndex: {
      type: Boolean,
      default: false,
    },
    // 是否显示选择框
    showSelection: {
      type: Boolean,
      default: false,
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: `100%`,
    },
    // 默认选中表格数据
    toggleSelectTable: {
      type: Array,
      default: () => [],
    },
    // 是否展示表格边框
    showBorder: {
      type: Boolean,
      default: false,
    },
    // 文字过长是否换行
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rowSelection: [],
    };
  },
  methods: {
    // 表头单元格的 style 的回调方法
    tableHerderCellStyle(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "text-align: center";
    },
    // 选中数据触发方法
    handleSelectChange(data) {
      this.$emit("SelectChangeTable", data);
    },
    // 父组件触发默认选中事件
    defaultSelectedEvent() {
      this.$nextTick(() => {
        this.$refs.proTableRef.doLayout(); // 解决表格错位
        if (this.toggleSelectTable && this.toggleSelectTable.length) {
          this.toggleSelectTable.forEach((item) => {
            this.$refs.proTableRef.toggleRowSelection(item, true); // 自动选中
          });
        }
      });
    },
    // 翻页
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
  },
};
</script>

<style scoped>
.pager-wrap {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>