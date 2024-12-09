# shared-utils 使用说明

`shared-utils` 是一个提供公共工具集的库，旨在为不同的 UI 组件库提供弹窗检测功能。以下是该库的使用说明和示例代码。

## 安装

首先，你需要安装 `shared-utils`：

```bash
npm install shared-utils
# 或者
pnpm add shared-utils
```

 ## 使用示例

1. 检测所有库，使用默认前缀
```typescript
startObservePopups(); // 默认值 'all'
```
2. 检测指定的库，使用默认前缀
```typescript
startObservePopups('element-ui'); // 只检测 Element UI
```
3. 检测指定的库，使用默认前缀（传递数组）
```typescript

startObservePopups(['element-ui']); // 只检测 Element UI
```
4. 检测指定的库，使用自定义前缀
```typescript

startObservePopups([
  { name: 'element-ui', prefix: 'x' },
  { name: 'element-plus', prefix: 'y' },
]);
```
5. 使用自定义检测函数
```typescript
const customDetectFunction: DetectFunction = () => {
  // 自定义逻辑
  return false; // 返回 false 或 true
};
startObservePopups('all', customDetectFunction);
```
6. 停止检测
```typescript

const observer = startObservePopups();
observer.disconnect(); // 停止检测
```

### 函数说明
`startObservePopups(componentLibs: string | string[] | { name: string, prefix: string }[] = 'all', customDetectFunction?: DetectFunction): MutationObserver`

此函数用于启动弹窗检测。可以通过传递组件库名称和前缀来定制检测的范围，也可以提供自定义的检测函数。

* `componentLibs`：指定检测的组件库或多个组件库。可以是：
  * `'all'`：检测所有支持的组件库（默认值）。
  * 一个字符串：只检测指定的库，如 `'element-ui'`。
  * 一个数组：检测多个库，如 `['element-ui', 'element-plus']`。
  * 一个包含库名称和前缀的对象数组：如 `[{ name: 'element-ui', prefix: 'x' }, { name: 'element-plus', prefix: 'y' }]`。

* `customDetectFunction`：可选，用户提供自定义的弹窗检测函数，返回 true 或 false，表示是否检测到弹窗。

`observer.disconnect()`
此方法用于停止弹窗检测。调用` disconnect()` 方法后，`startObservePopups` 返回的 `MutationObserver` 将停止工作。
