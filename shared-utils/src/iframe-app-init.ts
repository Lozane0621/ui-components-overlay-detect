// iframeAppInit
const iframeAppInit = (router) => {
  // 子应用->主应用
router.afterEach((to) => {
  // 路由必须存在
  if (to.matched.length) {
    window.top?.postMessage(
      {
        category: "MICROFE",
        message: {
          type: "push",
          path: to.fullPath,
        },
      },
      "*"
    );
  }
});

// 主应用->子应用
window.addEventListener("message", (e) => {
  const { data } = e;
  const { message, category } = data;
  if (category === "MICROFE") {
    if (message.type === "gotoRoutePath") {
      // 有路由的系统
      router.push(message.path).finally(() => {
        // 执行跳转完成以后要回传完成事件消息
        window.top?.postMessage(
          {
            category: "MICROFE",
            message: {
              type: "gotoRoutePathDone",
              path: message.path,
            },
          },
          "*"
        );
      });
    }
  }
});

// 子应用 ready
window.addEventListener("load", () => {
  console.log("子应用加载完成");
  window.parent.postMessage(
    {
      category: "MICROFE",
      message: {
        type: "ready",
      },
    },
    "*"
  );
});

}

export default iframeAppInit;
