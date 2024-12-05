import debounce from './debounce';
interface Message {
  type: string;
  popupElement?: HTMLElement;
}

type ComponentLib = 'element-ui' | 'element-plus' | 'ant-design-vue';

interface ComponentLibConfig {
  name: ComponentLib;
  prefix?: string;  // 可选，用户可以传入自定义前缀
}

interface StartObservePopups {
  (componentLibs?: 'all' | ComponentLib | ComponentLib[] | ComponentLibConfig[], customDetectFunction?: DetectFunction): MutationObserver | undefined;
}

interface DetectFunction {
  (...args: any[]): boolean;  // 支持接受任意个数和类型的参数
}

// 默认组件库的前缀映射
const defaultPrefixes: Record<ComponentLib, string> = {
  'element-ui': 'el',
  'element-plus': 'el',
  'ant-design-vue': 'ant',
};


// 监听来自主应用的消息
window.addEventListener('message', (event: MessageEvent) => {
  const message: Message = event.data;

  // 处理来自主应用的click消息
  if (message.type === 'click') {
    // 模拟点击事件触发关闭弹窗或下拉框
    triggerClickEventInSubApp();
  }
});


// 模拟鼠标事件
function triggerClickEventInSubApp(): void {
  console.log('子应用收到点击事件，模拟点击关闭其他弹层');

   // 模拟 click 事件
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  document.body.dispatchEvent(clickEvent);


  // 模拟 mousedown 事件
  const mousedownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  document.body.dispatchEvent(mousedownEvent);

  // 模拟 mouseup 事件
  const mouseupEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  document.body.dispatchEvent(mouseupEvent);
}


// 检测 Element UI 的全局弹出层
function detectPopupForElementUI(prefix: string): boolean {
  const bodyClass = document.body.className;
  if (bodyClass.includes(`${prefix}-popup-parent--hidden`)) {
    console.log('MessageBox/Dialog/Drawer is open');
    return true;
  }
  if (bodyClass.includes(`${prefix}-loading-parent--hidden`)) {
    console.log('Loading is open');
    return true;
  }
  if (document.querySelectorAll(`.${prefix}-image-viewer__wrapper`).length > 0) {
    console.log('Image preview is open');
    return true;
  }
  return false;
}

// 检测 Element Plus 的全局弹出层
function detectPopupForElementPlus(prefix: string): boolean {
  const bodyClass = document.body.className;
  if (bodyClass.includes(`${prefix}-popup-parent--hidden`)) {
    console.log('MessageBox/Dialog/Drawer is open');
    return true;
  }
  if (bodyClass.includes(`${prefix}-loading-parent--hidden`)) {
    console.log('Loading is open');
    return true;
  }
  if (bodyClass.includes(`${prefix}-tour-parent--hidden`)) {
    console.log('Tour is open');
    return true;
  }
  if (document.querySelectorAll(`.${prefix}-image-viewer__wrapper`).length > 0) {
    console.log('Image preview is open');
    return true;
  }
  return false
}

// 检测 Ant Design Vue 的全局弹出层（兼容v1.x-v4.x版本）
function detectPopupForAntDesignVue(prefix: string): boolean {
  // 1. 检查 Modal 是否打开
  // 使用 querySelectorAll 查找所有的 Modal 元素，class 为 ${prefix}-modal-root。
  // 对每个 Modal，我们检查它的遮罩层 (${prefix}-modal-mask)。
  // 如果遮罩层存在且它的 display 样式不是 'none'，说明 Modal 正在打开。
  const modalRoots = document.querySelectorAll(`.${prefix}-modal-root`) as NodeListOf<HTMLElement>;
  for (const modalRoot of Array.from(modalRoots)) {
    const modalMask = modalRoot.querySelector(`.${prefix}-modal-mask`) as HTMLElement;
    if (modalMask && modalMask.style.display !== 'none') {
      console.log('Modal is open');
      return true; // 找到打开的 Modal 后，立即返回 true。
    }
  }

  // 2. 检查 Drawer 是否打开
  // 使用 querySelectorAll 查找所有的 Drawer 元素，class 为 ${prefix}-drawer。
  // 对每个 Drawer，我们检查它的遮罩层 (${prefix}-drawer-mask) 和是否包含 ${prefix}-drawer-open 类。
  // 如果遮罩层存在且该类存在，说明 Drawer 正在打开。
  const drawers = document.querySelectorAll(`.${prefix}-drawer`)as NodeListOf<HTMLElement>;
  for (const drawer of Array.from(drawers)) {
    const drawerMask = drawer.querySelector(`.${prefix}-drawer-mask`);
    if (drawerMask && drawer.classList.contains(`${prefix}-drawer-open`)) {
      console.log('Drawer is open');
      return true;
    }
  }

  // 3. 检查 Image 预览是否打开
  // 使用 querySelectorAll 查找所有的图片预览根容器，class 为 ${prefix}-image-preview-root。
  // 对每个预览，我们检查它的遮罩层 (${prefix}-image-preview-mask)。
  // 如果遮罩层存在且它的 display 样式不是 'none'，说明图片预览正在打开。
  const imagePreviews = document.querySelectorAll(`.${prefix}-image-preview-root`) as NodeListOf<HTMLElement>;
  for (const preview of Array.from(imagePreviews)) {
    const previewMask = preview.querySelector(`.${prefix}-image-preview-mask`) as HTMLElement;
    if (previewMask && previewMask.style.display !== 'none') {
      console.log('Image preview is open');
      return true;
    }
  }

  // 4. 检查 Tour 引导是否正在显示
  // 使用 querySelectorAll 查找所有的 Tour 遮罩层元素，class 为 ${prefix}-tour-mask。
  // 如果找到 Tour 遮罩层，说明 Tour 引导正在显示。
  const tourMasks = document.querySelectorAll(`.${prefix}-tour-mask`);
  if (tourMasks.length > 0) {
    console.log('Tour is open');
    return true;
  }

  // 如果没有任何弹窗检测为打开状态，返回 false。
  return false;
}



// 主侦测函数
const startObservePopups: StartObservePopups = (componentLibs = 'all', customDetectFunction) => {
  console.log('组件库弹窗侦测机制已启动...');
  let isPopupOpen = false;

  // 默认的组件库侦测函数映射
  const detectFunctions: Record<ComponentLib, DetectFunction> = {
    'element-ui': detectPopupForElementUI,
    'element-plus': detectPopupForElementPlus,
    'ant-design-vue': detectPopupForAntDesignVue,
    // 其他更多的组件库，如iview, vuetify,material-ui,primevue,naive-ui,arco-design-vue...
  };

  // 处理传入的 componentLibs 参数
  let libsToCheck: ComponentLibConfig[] = [];

  // 如果是 'all'，检查所有库
  if (componentLibs === 'all') {
    libsToCheck = Object.keys(detectFunctions).map(lib => ({
      name: lib as ComponentLib,
      prefix: defaultPrefixes[lib as ComponentLib],
    }));
  } else if (Array.isArray(componentLibs)) {
    // 如果是数组，判断数组中的元素是组件库名称还是包含配置的对象
    libsToCheck = componentLibs.map(lib => {
      if (typeof lib === 'string') {
        return { name: lib, prefix: defaultPrefixes[lib] };
      } else {
        return lib;
      }
    });
  } else {
    // 单个库名称时，使用默认前缀
    libsToCheck = [{
      name: componentLibs,
      prefix: defaultPrefixes[componentLibs],
    }];
  }

  // 检查传入的组件库是否合法
  for (const lib of libsToCheck) {
    if (!detectFunctions[lib.name]) {
      console.error(`Invalid component library: ${lib.name}`);
      return;
    }
  }

  // 防抖 MutationObserver 回调函数
  const debounceObserver = debounce((mutations: MutationRecord[]) => {
    console.log('DOM 发生变化，检查是否有弹窗被打开...');
    console.time('检查弹窗是否打开耗时：');
    isPopupOpen = false;

    // 检测每个组件库的弹窗
    for (const lib of libsToCheck) {
      const detectFunction = detectFunctions[lib.name];
      const prefix = lib.prefix || defaultPrefixes[lib.name];  // 获取默认前缀或自定义前缀
      if (detectFunction && detectFunction(prefix)) {
        isPopupOpen = true;
        break; // 一旦检测成功，立即退出循环
      }
    }

    // 执行自定义的侦测函数（如果传入了）
    if (customDetectFunction && customDetectFunction(mutations)) {
      isPopupOpen = true;
    }

    // 根据弹窗是否打开，发送消息
    if (isPopupOpen) {
      window.parent.postMessage({ type: 'popup-opened' }, '*');
    } else {
      window.parent.postMessage({ type: 'popup-closed' }, '*');
    }
    console.timeEnd('检查弹窗是否打开耗时：');
  }, 30);

  // MutationObserver
  const observer = new MutationObserver(debounceObserver);

  // 配置 MutationObserver
  const config: MutationObserverInit = {
    childList: true,  // 监听子节点的变化
    subtree: true,    // 监听所有子树
    attributes: true, // 监听属性的变化
    attributeFilter: ['class', 'style'],// 只监听 class 和 style 属性的变化
  };

  // 启动 MutationObserver
  observer.observe(document.body, config);
  return observer;
};

export default startObservePopups;

// 用法示例：

// // 1. 检测所有库，使用默认前缀
// startObservePopups(); // 默认值 'all'

// // 2. 检测指定的库，使用默认前缀
// startObservePopups('element-ui'); // 只检测 Element UI

// // 3. 检测指定的库，使用默认前缀
// startObservePopups(['element-ui']); // 只检测 Element UI

// // 4. 检测指定的库，使用自定义前缀
// startObservePopups([
//   { name: 'element-ui', prefix: 'x' },
//   { name: 'element-plus', prefix: 'y' },
// ]);

// // 5. 使用自定义检测函数
// const customDetectFunction: DetectFunction = () => {
//   // 自定义逻辑
//   return false; // 返回 false 或 true
// };
// startObservePopups('all', customDetectFunction);

// // 6. 停止检测
// const observer = startObservePopups();
// observer.disconnect(); // 停止检测
