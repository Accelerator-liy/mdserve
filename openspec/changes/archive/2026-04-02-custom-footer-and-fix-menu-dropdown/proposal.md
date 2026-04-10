## Why

mdserve 当前缺少页面底部 footer 区域，无法展示版权信息、联系方式等常见网站底部内容。同时，顶部导航菜单的下拉面板（基于 Radix NavigationMenu）存在定位 bug：无论鼠标悬停在哪个菜单项上，下拉面板始终出现在固定位置（导航栏左边缘），而非跟随当前菜单项正下方。这影响了多级菜单的可用性。

## What Changes

- **新增可配置 Footer**：在 `.mdserve.yaml` 配置文件中新增 `footer` 字段，支持自定义纯文本内容（如版权声明）。前端新增 `Footer` 组件渲染该内容，显示在主内容区底部。
- **修复导航菜单下拉定位**：修复 `NavigationMenuViewport` 的 DOM 包裹结构导致 Radix NavigationMenu 无法正确计算和移动下拉面板位置的问题，使下拉面板跟随当前激活的菜单项正下方显示。

## Capabilities

### New Capabilities
- `custom-footer`: 通过配置文件定义页面底部 footer 内容，前端渲染为独立区域

### Modified Capabilities
<!-- 无现有 spec 需要修改 -->

## Impact

- **后端配置**：`internal/config/config.go` 新增 `Footer` 字段；`internal/server/server.go` 的 `Config` 结构体新增 footer 传递；`internal/server/handlers.go` 的 `/api/config` 端点返回 footer 数据
- **前端组件**：新增 `web/src/components/Footer.tsx` 组件；修改 `web/src/App.tsx` 布局引入 Footer
- **前端 UI**：修改 `web/src/components/ui/navigation-menu.tsx` 中的 `NavigationMenuViewport` 组件，移除阻止 Radix 定位的包裹 div
- **配置文件**：`.mdserve.yaml` 新增 `footer` 配置项，`config.ExampleConfig()` 更新示例

## Non-goals

- 不支持 footer 中的 HTML/Markdown 渲染（仅纯文本）
- 不支持 footer 多列布局或复杂样式自定义
- 不修改导航菜单的交互行为或动画效果（仅修复定位）
