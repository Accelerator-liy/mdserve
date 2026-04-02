## 1. 后端：Footer 配置支持

- [x] 1.1 在 `internal/config/config.go` 的 `SiteConfig` 结构体中新增 `Footer string` 字段（`yaml:"footer"`）
- [x] 1.2 在 `internal/server/server.go` 的 `Config` 结构体中新增 `Footer string` 字段，并在 `cmd/mdserve/main.go` 的 `runServe` 中传递 `cfg.Site.Footer`
- [x] 1.3 在 `internal/server/handlers.go` 的 `handleGetConfig` 响应中添加 `"footer": s.config.Footer`
- [x] 1.4 更新 `config.ExampleConfig()` 在示例配置中添加 `footer` 字段及注释

## 2. 前端：Footer 组件

- [x] 2.1 创建 `web/src/components/Footer.tsx` 组件，接收 `text: string` prop，为空时返回 `null`，否则渲染 `<footer>` 元素
- [x] 2.2 在 `web/src/contexts/FileContext.tsx` 中从 `/api/config` 响应中提取 `footer` 字段并暴露给消费者
- [x] 2.3 在 `web/src/App.tsx` 布局中，在 `<main>` 之后引入 `<Footer>` 组件，添加 `flex-shrink-0` 样式

## 3. 前端：修复导航菜单下拉定位

- [x] 3.1 修改 `web/src/components/ui/navigation-menu.tsx` 中的 `NavigationMenuViewport` 组件：移除外层包裹的 `<div className="absolute left-0 top-full z-50 flex justify-center">`，将定位样式 (`absolute top-full left-0 z-50`) 直接应用到 `NavigationMenuPrimitive.Viewport` 元素上
- [x] 3.2 验证修复效果：多个带子菜单的菜单项，悬停切换时下拉面板跟随到对应菜单项下方
