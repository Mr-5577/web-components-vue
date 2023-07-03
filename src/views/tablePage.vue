<template>
  <div>
    <!-- 列表展示页面 -->
    <pro-table
      :tableData="tableData"
      :tableColum="colum"
      :tableLoading="loading"
      :pagination="pagination"
      :showIndex="true"
      :showSelection="true"
      :showBorder="true"
      :tableHeight="'500px'"
    >
      <el-table-column slot="action" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDeiate(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="handleDeiate(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </pro-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from "@/components/base-table.vue";
export default {
  components: {
    "pro-table": BaseTable,
  },
  data() {
    return {
      tableData: [
        {
          total: "20人",
          name: "王小虎",
          num1: "3",
          num2: "5",
          num3: "7",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 1,
        },
        {
          total: "38人",
          name: "王小虎",
          num1: "3",
          num2: "5",
          num3: "7",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 2,
        },
      ],
      colum: [
        { label: "合计", prop: "total" },
        { label: "地址", prop: "address" },
        {
          label: "班级",
          prop: "result",
          multiList: [
            { label: "一年级", prop: "num1", width: "150" },
            { label: "二班", prop: "num2", width: "150" },
            { label: "三班", prop: "num3", width: "150" },
          ],
        },
        { label: "操作", slot: "action" },
      ],
      loading: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
      dialogVisible: false,
    };
  },
  methods: {
    handleDeiate(row) {
      console.log(row);
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
</style>