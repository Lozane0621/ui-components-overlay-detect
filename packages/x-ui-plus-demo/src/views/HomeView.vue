<template>
  <div>
    <h2>（中断类）全局弹窗类测试</h2>
    <xq-alert
      title="测试说明"
      type="info"
      description="中断类的弹窗打开后将无法切换到其他页面，直到关闭当前弹窗，不管有没有追加到body。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    >
    </xq-alert>
    <xq-row :gutter="20">
      <xq-col :xs="12" :sm="8" :md="6" :lg="6">
        <xq-card class="box-card">
          <template #header>MessageBox 弹框</template>
          <xq-button type="primary" @click="openMessageBox">MessageBox 弹框</xq-button>
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </xq-card>
      </xq-col>
      <xq-col :xs="12" :sm="8" :md="6" :lg="6">
        <xq-card class="box-card">
          <template #header>Dialog 对话框</template>
          <xq-button type="primary" @click="openDialog">打开 Dialog</xq-button>
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </xq-card>
      </xq-col>
      <xq-col :xs="12" :sm="8" :md="6" :lg="6">
        <xq-card class="box-card">
          <template #header>Drawer 抽屉</template>
          <xq-button type="primary" @click="openDrawer">打开 Drawer</xq-button>
          <p>通过body class是否包含el-popup-parent--hidden检测</p>
        </xq-card>
      </xq-col>
      <xq-col :xs="12" :sm="8" :md="6" :lg="6">
        <xq-card class="box-card">
          <template #header>Loading</template>
          <xq-button type="primary" @click="openFullScreenLoading">全屏loading</xq-button>
          <p>通过body class是否包含el-loading-parent--hidden检测</p>
        </xq-card>
      </xq-col>
      <xq-col :xs="12" :sm="8" :md="6" :lg="6">
        <xq-card class="box-card">
          <template #header>Image 图片预览</template>
          <xq-image style="width: 60px; height: 60px" :src="url" :preview-src-list="srcList">
          </xq-image>
          <p>通过class是否包含el-image-viewer__wrapper检测</p>
        </xq-card>
      </xq-col>
      <xq-col :xs="12" :sm="12" :md="12" :lg="12">
        <xq-card class="box-card">
          <template #header>Tour 漫游引导</template>
          <xq-button type="primary" @click="isOpenTour = true">Begin Tour</xq-button>
          <xq-divider />
          <xq-space>
            <xq-button ref="ref1">Upload</xq-button>
            <xq-button ref="ref2" type="primary">Save</xq-button>
            <xq-button ref="ref3" :icon="MoreFilled" />
          </xq-space>
          <xq-tour v-model="isOpenTour">
            <xq-tour-step :target="ref1?.$el" title="Upload File">
              <img
                style="width: 240px"
                src="https://element-plus.org/images/element-plus-logo.svg"
                alt="tour.png"
              />
              <div>Put you files here.</div>
            </xq-tour-step>
            <xq-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
            <xq-tour-step
              :target="ref3?.$el"
              title="Other Actions"
              description="Click to see other"
            />
          </xq-tour>
          <p>通过body class是否包含el-tour-parent--hidden检测</p>
        </xq-card>
      </xq-col>
    </xq-row>

    <xq-dialog draggable overflow title="外层 Dialog" v-model="outerDialogVisible">
      <span>This is the outer Dialog</span>
      <xq-dialog v-model="innerDialogVisible" width="40%" title="内层 Dialog" append-to-body>
        <span>This is the inner Dialog</span>
      </xq-dialog>
      <template #footer>
        <div class="dialog-footer">
          <xq-button @click="outerDialogVisible = false">Cancel</xq-button>
          <xq-button type="primary" @click="innerDialogVisible = true">
            Open the inner Dialog
          </xq-button>
        </div>
      </template>
    </xq-dialog>

    <xq-drawer title="外层 Drawer" v-model="outerDrawerVisible" size="60%">
      <div>
        <xq-button @click="innerDrawerVisible = true">打开里面的!</xq-button>
        <xq-drawer
          size="50%"
          title="内层 Drawer"
          :append-to-body="true"
          v-model="innerDrawerVisible"
        >
          <p>我是里面的Drawer</p>
        </xq-drawer>
      </div>
    </xq-drawer>

    <h2>（非中断类）局部弹出层类测试</h2>
    <xq-alert
      title="测试说明"
      type="info"
      description="非中断类的局部弹层打开后，可直接切换页面，且弹出层会自动消失。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    >
    </xq-alert>
    <div style="margin-top: 20px">
      <xq-select v-model="selectedOption" placeholder="请选择" style="width: 200px">
        <xq-option label="Option 1" value="1"></xq-option>
        <xq-option label="Option 2" value="2"></xq-option>
      </xq-select>

      <xq-cascader
        v-model="cascaderValue"
        :options="cascaderOptions"
        placeholder="选择级联"
      ></xq-cascader>

      <xq-date-picker v-model="dateValue" type="date" placeholder="选择日期"></xq-date-picker>

      <xq-tree-select
        v-model="treeSelectValue"
        :data="treeSelectOptions"
        :render-after-expand="false"
        show-checkbox
        style="width: 240px"
        placeholder="树形下拉框"
      />

      <xq-popover
        placement="bottom"
        title="Title"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <xq-button class="m-2"> popover click</xq-button>
        </template>
      </xq-popover>

      <xq-popconfirm title="Are you sure to delete this?">
        <template #reference>
          <xq-button>popconfirm 删除</xq-button>
        </template>
      </xq-popconfirm>

      <xq-dropdown trigger="click">
        <span class="xq-dropdown-link">
          下拉菜单<xq-icon class="xq-icon--right"><arrow-down /></xq-icon>
        </span>
        <template #dropdown>
          <xq-dropdown-menu>
            <xq-dropdown-item :icon="Plus">Action 1</xq-dropdown-item>
            <xq-dropdown-item :icon="CirclePlusFilled"> Action 2 </xq-dropdown-item>
            <xq-dropdown-item :icon="CirclePlus">Action 3</xq-dropdown-item>
            <xq-dropdown-item :icon="Check">Action 4</xq-dropdown-item>
            <xq-dropdown-item :icon="CircleCheck">Action 5</xq-dropdown-item>
          </xq-dropdown-menu>
        </template>
      </xq-dropdown>

      <xq-color-picker v-model="colorValue"></xq-color-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { XqMessageBox } from '@xquant/x-ui-plus'
import { XqLoading } from '@xquant/x-ui-plus'
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
  MoreFilled,
} from '@xquant/x-ui-plus-icons-vue'
import type { ButtonInstance } from '@xquant/x-ui-plus'

// 全局弹窗状态
const outerDialogVisible = ref(false)
const innerDialogVisible = ref(false)
const outerDrawerVisible = ref(false)
const innerDrawerVisible = ref(false)

const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
]

// 漫游引导状态
const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()
const isOpenTour = ref(false)

// 全屏loading状态
const openFullScreenLoading = () => {
  const loading = XqLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'xq-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 5000)
}

// 局部弹层状态
const selectedOption = ref('')
const cascaderValue = ref([])
const dateValue = ref('')
const colorValue = ref('')
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
])

const treeSelectValue = ref()

const treeSelectOptions = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
]

// 弹窗类操作
const openMessageBox = () => {
  XqMessageBox.alert('这是一个测试 MessageBox 弹框', '测试标题', {
    confirmButtonText: '确定',
  })
}

const openDialog = () => {
  outerDialogVisible.value = true
}

const openDrawer = () => {
  outerDrawerVisible.value = true
}
</script>

<style scoped>
/* 添加一些简单的样式用于分组 */
h2 {
  margin-top: 20px;
  color: #409eff;
}

.box-card {
  margin-top: 20px;
}
</style>
