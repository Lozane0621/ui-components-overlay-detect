<template>
  <div>
    <h2>（中断类）全局弹窗类测试</h2>
    <el-alert
      title="测试说明"
      type="info"
      description="中断类的弹窗打开后将无法切换到其他页面，直到关闭当前弹窗，不管有没有追加到body。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    >
    </el-alert>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="8" :md="6" :lg="6">
        <el-card class="box-card">
          <div slot="header">MessageBox 弹框</div>
          <el-button type="primary" @click="openMessageBox"
            >MessageBox 弹框</el-button
          >
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="6">
        <el-card class="box-card">
          <div slot="header">Dialog 对话框</div>
          <el-button type="primary" @click="openDialog">单个Dialog</el-button>
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="6">
        <el-card class="box-card">
          <div slot="header">Drawer 抽屉</div>
          <el-button type="primary" @click="openDrawer">单个Drawer</el-button>
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="6">
        <el-card class="box-card">
          <div slot="header">Loading</div>
          <el-button type="primary" @click="openFullScreenLoading">
            全屏loading
          </el-button>
          <p>通过body class是否包含el-loading-parent--hidden检测</p>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="6">
        <el-card class="box-card">
          <div slot="header">Image 图片预览</div>
          <el-image
            style="width: 60px; height: 60px"
            :src="url"
            :preview-src-list="srcList"
          >
          </el-image>
          <p>通过class是否包含el-image-viewer__wrapper检测</p>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="外层 Dialog" :visible.sync="outerDialogVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerDialogVisible"
        append-to-body
      >
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerDialogVisible = true"
          >打开内层 Dialog</el-button
        >
      </div>
    </el-dialog>

    <el-drawer
      title="外层 Drawer"
      :visible.sync="outerDrawerVisible"
      size="60%"
    >
      <div>
        <el-button @click="innerDrawerVisible = true">打开里面的!</el-button>
        <el-drawer
          size="50%"
          title="内层 Drawer"
          :append-to-body="true"
          :visible.sync="innerDrawerVisible"
        >
          <p>我是里面的Drawer</p>
        </el-drawer>
      </div>
    </el-drawer>

    <h2>（非中断类）局部弹出层类测试</h2>
    <el-alert
      title="测试说明"
      type="info"
      description="非中断类的局部弹层打开后，可直接切换页面，且弹出层会自动消失。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    >
    </el-alert>
    <div style="margin-top: 20px">
      <el-select v-model="selectedOption" placeholder="请选择">
        <el-option label="Option 1" value="1"></el-option>
        <el-option label="Option 2" value="2"></el-option>
      </el-select>

      <el-cascader
        v-model="cascaderValue"
        :options="cascaderOptions"
        placeholder="选择级联"
      ></el-cascader>

      <el-date-picker
        v-model="dateValue"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>

      <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-button slot="reference"> popover click</el-button>
      </el-popover>

      <el-popconfirm title="这是一段内容确定删除吗？">
        <el-button slot="reference">popconfirm 删除</el-button>
      </el-popconfirm>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline"
            >螺蛳粉</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check"
            >蚵仔煎</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-color-picker v-model="colorValue"></el-color-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MessageBox } from 'element-ui';
import { Loading } from 'element-ui';

// 全局弹窗状态
const outerDialogVisible = ref(false);
const innerDialogVisible = ref(false);
const outerDrawerVisible = ref(false);
const innerDrawerVisible = ref(false);

const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
];

// 全屏loading状态
const openFullScreenLoading = () => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  setTimeout(() => {
    loading.close();
  }, 5000);
};

// 局部弹层状态
const selectedOption = ref('');
const cascaderValue = ref([]);
const dateValue = ref('');
const colorValue = ref('');
const cascaderOptions = ref([
  {
    value: 'option1',
    label: 'Option 1',
    children: [
      {
        value: 'option1-1',
        label: 'Option 1-1',
      },
    ],
  },
  {
    value: 'option2',
    label: 'Option 2',
    children: [
      {
        value: 'option2-1',
        label: 'Option 2-1',
      },
    ],
  },
]);

// 弹窗类操作
const openMessageBox = () => {
  MessageBox.alert('这是一个测试 MessageBox 弹框', '测试标题', {
    confirmButtonText: '确定',
  });
};

const openDialog = () => {
  outerDialogVisible.value = true;
};

const openDrawer = () => {
  outerDrawerVisible.value = true;
};
</script>

<style scoped>
/* 添加一些简单的样式用于分组 */
h2 {
  margin-top: 20px;
  color: #409eff;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.box-card {
  margin-top: 20px;
}
</style>
