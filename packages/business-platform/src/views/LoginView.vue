<template>
  <div class="login-view">
    <div class="login-card">
      <h2>欢迎登录</h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          class="text-center"
          label-width="0"
        >
          <div
            class="flex-center"
            w="full"
          >
            <el-button
              v-loading="loading"
              type="primary"
              :disabled="loading"
              @click="submitForm(ruleFormRef)"
            >
              <span v-if="!loading">登录</span>
              <span
                v-else
                class="loading"
              >
                登录中...
              </span>
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const loading = ref(false);

const ruleForm = reactive({
  username: '',
  password: ''
});

// 校验
const validatePass = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度3~5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
});

const submitForm = (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      await userStore.login(ruleForm.username, ruleForm.password);
      router.push('/home');
    } else {
      // 表单验证失败
    }
    loading.value = false;
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: $border-radius;
  padding: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: $text-primary;
  }
}
</style>
