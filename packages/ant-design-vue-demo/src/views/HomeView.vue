<template>
  <div>
    <h2>（中断类）全局弹窗类测试</h2>

    <a-alert
      type="info"
      message="测试说明"
      description="中断类的弹窗打开后将无法切换到其他页面，直到关闭当前弹窗，不管有没有追加到body。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    />

    <a-row :gutter="20">
      <a-col :xs="12" :sm="8" :md="6" :lg="6">
        <a-card hoverable title="（方法）Modal 提示和确认" class="box-card">
          <a-space direction="vertical">
            <a-button type="primary" @click="openModalInfo">Modal 提示</a-button>
            <a-button type="primary" @click="openModalConfirm">Modal 确认</a-button>
          </a-space>
          <p>通过body class是否包含ant-modal-hidden检测，Modal方法调用后自动销毁弹窗元素</p>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="8" :md="6" :lg="6">
        <a-card hoverable title="（组件）Modal 模态框" class="box-card">
          <a-button type="primary" @click="openModal">打开 Modal</a-button>
          <p>通过body class是否包含ant-modal-hidden检测，组件形式默认不会销毁弹窗元素</p>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="8" :md="6" :lg="6">
        <a-card hoverable title="Drawer 抽屉" class="box-card">
          <a-button type="primary" @click="openDrawer">打开 Drawer</a-button>
          <p>通过body class是否包含ant-drawer-open检测</p>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="8" :md="6" :lg="6">
        <a-card hoverable title="Image 图片预览" class="box-card">
          <a-image
            :width="60"
            :height="60"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <p>通过class是否包含el-image-viewer__wrapper检测</p>
        </a-card>
      </a-col>
      <a-col :xs="2" :sm="24" :md="12" :lg="12">
        <a-card hoverable title="Tour 漫游引导" class="box-card">
          <a-button type="primary" @click="isOpenTour = true">Begin Tour</a-button>

          <a-divider />

          <a-space>
            <a-button ref="ref1">Upload</a-button>
            <a-button ref="ref2" type="primary">Save</a-button>
            <a-button ref="ref3">
              <EllipsisOutlined />
            </a-button>
          </a-space>

          <a-tour
            v-model:current="current"
            :open="isOpenTour"
            :steps="steps"
            @close="isOpenTour = false"
          />
          <p>通过class是否包含el-image-viewer__wrapper检测</p>
        </a-card>
      </a-col>
    </a-row>

    <a-modal v-model:open="outerModalVisible" title="外层 Modal" @ok="outerModalVisible = false">
      <a-button type="primary" @click="innerModalVisible = true">打开内层 Modal</a-button>
      <a-modal v-model:open="innerModalVisible" title="内层 Modal" @ok="innerModalVisible = false">
        <p>这是内层 Modal</p>
      </a-modal>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-drawer
      v-model:open="outerDrawerVisible"
      title="Multi-level drawer"
      width="520"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
    >
      <a-button type="primary" @click="innerDrawerVisible = true">打开内层 Drawer</a-button>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <a-drawer
        v-model:open="innerDrawerVisible"
        title="Two-level Drawer"
        width="320"
        :closable="false"
      >
        <p>这是内层 Drawer</p>
      </a-drawer>

      <template #footer>
        <a-button style="margin-right: 8px" @click="outerDrawerVisible = false">Cancel</a-button>
        <a-button type="primary" @click="outerDrawerVisible = false">Submit</a-button>
      </template>
    </a-drawer>

    <h2>（非中断类）局部弹出层类测试</h2>
    <a-alert
      type="info"
      message="测试说明"
      description="非中断类的局部弹层打开后，可直接切换页面，且弹出层会自动消失。"
      show-icon
      :closable="false"
      style="margin-top: 10px"
    />

    <div style="margin-top: 20px">
      <a-select v-model="selectedOption" placeholder="请选择" style="width: 200px">
        <a-select-option value="1">Option 1</a-select-option>
        <a-select-option value="2">Option 2</a-select-option>
      </a-select>
      <a-cascader v-model="cascaderValue" :options="cascaderOptions" placeholder="选择级联" />
      <a-date-picker v-model="dateValue" type="date" placeholder="选择日期" />
      <a-tree-select
        v-model="treeSelectValue"
        :tree-data="treeSelectOptions"
        placeholder="树形下拉框"
        style="width: 240px"
      />
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          下拉菜单
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0"> 吃饭 </a-menu-item>
            <a-menu-item key="1"> 睡觉 </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">打游戏</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-popover title="Title" trigger="click">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <a-button type="primary">popover click</a-button>
      </a-popover>
      <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
        <a-button danger>popconfirm click</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined, EllipsisOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { TourProps } from 'ant-design-vue'

// 全局弹窗状态
const outerModalVisible = ref(false)
const innerModalVisible = ref(false)
const outerDrawerVisible = ref(false)
const innerDrawerVisible = ref(false)

// 局部弹层状态
const selectedOption = ref('')
const cascaderValue = ref([])
const dateValue = ref('')

const treeSelectValue = ref('')
const treeSelectOptions = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
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
      },
    ],
  },
]

const cascaderOptions = [
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
]

// 全局弹窗方法
const openModalInfo = () => {
  Modal.info({
    title: 'This is a notification message',
    content: h('div', {}, [
      h('p', 'some messages...some messages...'),
      h('p', 'some messages...some messages...'),
    ]),
    onOk() {
      console.log('ok')
    },
  })
}
const openModalConfirm = () => {
  Modal.confirm({
    title: 'Do you Want to delete these items?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    },
    class: 'test',
  })
}
const openModal = () => {
  outerModalVisible.value = true
}
const openDrawer = () => {
  outerDrawerVisible.value = true
}

// 漫游引导
const isOpenTour = ref<boolean>(false)

const ref1 = ref<HTMLElement | null>(null)
const ref2 = ref<HTMLElement | null>(null)
const ref3 = ref<HTMLElement | null>(null)

const current = ref(0)
const steps: TourProps['steps'] = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
    cover: createVNode('img', {
      alt: 'tour.png',
      src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
    }),
    // @ts-expect-error: Ignore TypeScript error for $el
    target: () => ref1.value?.$el,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    // @ts-expect-error: Ignore TypeScript error for $el
    target: () => ref2.value?.$el,
  },
  {
    title: 'Other Actions',
    description: 'Click to see other actions.',
    // @ts-expect-error: Ignore TypeScript error for $el
    target: () => ref3.value?.$el,
  },
]
</script>

<style scoped>
/* 添加一些简单的样式用于分组 */
h2 {
  margin-top: 20px;
  color: #1890ff;
}

.box-card {
  margin-top: 20px;
}
</style>
