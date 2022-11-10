<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const loginForm = ref({
  username: "admin",
  password: "123456",
});

const passwordType = ref("password");
const loading = ref(false);

const name = ref(null);

onMounted(() => {
  name.value.focus();
});

const handleLogin = async () => {
  loading.value = true;
  if (
    loginForm.value.username == "admin" &&
    loginForm.value.password.length == 6
  ) {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    loading.value = false;
    router.push("/home");
  } else {
    ElMessage.error("账号或密码错误");
    loading.value = false;
  }
};

const loginRef = ref(null);

const userLogin = () => {
  if (!loginRef.value) return;
  loginRef.value.validate((valid) => {
    if (valid) {
      handleLogin();
    } else {
      ElMessage({
        type: "error",
        message: "请填写用户名和密码！",
      });
    }
  });
};
</script>

<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
      ref="loginRef"
      require-asterisk-position="right"
    >
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <div class="input-from">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            ref="name"
            placeholder="输入账号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="off"
          >
            <template #prepend>
              <el-icon style="font-size: 20px"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter="handleLogin"
            ><template #prepend>
              <el-icon style="font-size: 20px"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>

      <el-button
        :loading="loading"
        style="width: 100%; height: 40px"
        type="primary"
        @click.prevent="userLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right bottom, #535b5b, #333637);

  .title-container {
    text-align: center;
    color: #fff;
    margin: 20px 0;
  }

  .login-form {
    width: 450px;
    height: 300px;
    padding: 20px 30px;
    background-image: linear-gradient(to right bottom, #535b5b, #333637);
    border-radius: 20px;
    box-shadow: 0 0 12px rgba(103, 160, 231, 1);

    .input-from {
      :deep(.el-button) {
        background: rgba(87, 91, 93, 0.3);
        border: none;
      }
      :deep(.el-input-group__prepend) {
        border: none;
      }
    }

    :deep(.el-button) {
      background-image: linear-gradient(to top, #00c5e4, #6ddcf0);
    }
  }

  :deep(.el-form-item__label) {
    color: #fff;
  }

  :deep(.el-input__inner) {
    color: #333;
  }
  :deep(.el-input__wrapper) {
    padding: 5px;
  }
}
</style>
