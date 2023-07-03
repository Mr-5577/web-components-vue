<template>
  <div class="loginPage">
    <div>登录页面</div>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="accountNumber">
        <el-input
          v-model="ruleForm.accountNumber"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/index";
export default {
  name: "UserLogin",
  data() {
    return {
      ruleForm: {
        accountNumber: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.ruleForm.accountNumber == this.userInfo.userName &&
            this.ruleForm.password == this.userInfo.password
          ) {
            this.$router.replace("/index");
          } else {
            this.$message.error("账号密码错误");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(103, 194, 58, 0.3);
}
</style>