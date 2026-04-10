## Context

mdserve 是一个 Go + React (TypeScript) 的实时 Markdown 文件服务器。前端使用 Radix UI + Tailwind CSS (shadcn/ui 模式) 构建。当前存在两个问题：

1. **无 Footer**：页面布局缺少底部区域，无法展示版权信息等内容。布局结构为 `header → main → (无 footer)`。
2. **导航菜单下拉定位异常**：`NavigationMenuViewport` 组件被包裹在一个额外的 `<div className="absolute left-0 top-full">` 中。Radix NavigationMenu 通过内联 style 在 Viewport 元素上设置 `left`/`top`/`width` 来实现下拉面板跟随激活菜单项。但外层包裹 div 阻止了 Radix 的定位逻辑——包裹 div 自身固定在 `left: 0`，且其宽度收缩为 viewport 内容宽度，导致 viewport 无法水平移动。

## Goals / Non-Goals

**Goals:**
- 通过 `.mdserve.yaml` 配置 footer 文本内容，前端渲染为页面底部固定区域
- 修复 Radix NavigationMenu 下拉面板定位，使其跟随当前激活的菜单项

**Non-Goals:**
- 不支持 footer HTML/Markdown 渲染
- 不修改导航菜单的交互动画或样式
- 不引入新的第三方依赖

## Decisions

### 1. Footer 配置与渲染方式

**决策**：在 `SiteConfig` 中新增 `Footer string` 字段，通过已有的 `/api/config` 端点返回。前端新增 `Footer` 组件，在 `App.tsx` 布局的 `<main>` 之后渲染。

**替代方案**：
- *新建独立 `/api/footer` 端点* → 增加不必要的 API 复杂度，footer 数据量极小，合并到 `/api/config` 更合理。
- *支持 Markdown 渲染* → 增加复杂度，footer 内容通常为简短版权信息，纯文本足够。

### 2. Footer 布局定位

**决策**：Footer 作为 `<main>` 的兄弟元素，使用 `flex-shrink-0` 固定高度。主内容区 `flex-1` 自动填充剩余空间。

**理由**：当前布局已经是 `h-screen flex flex-col`，添加 footer 只需在 flex 列中追加一个元素。当 footer 为空时，组件返回 `null`，不占用空间。

### 3. 导航菜单下拉定位修复

**决策**：移除 `NavigationMenuViewport` 外层包裹的 `<div>`，将定位样式 (`absolute top-full left-0 z-50`) 直接应用到 Viewport 元素上。Radix NavigationMenu 通过内联 style 动态设置 `left` 和 `width`，移除包裹 div 后 Radix 可以直接控制 viewport 的定位。

**替代方案**：
- *给包裹 div 设置 `w-full`* → 包裹 div 宽度等于 Root 宽度（受 `max-w-max` 限制为菜单内容宽度），仍然不够灵活，Radix 的定位逻辑仍被外层干扰。
- *切换到 `@radix-ui/react-dropdown-menu`* → 改动过大，Radix NavigationMenu 本身支持正确的行为，问题仅在于包裹 div 的存在。

## Risks / Trade-offs

- **[Footer 为空时不渲染]** → Footer 组件检查内容是否为空，为空返回 `null`，不影响布局。无需额外处理。
- **[Radix Viewport 样式覆盖]** → Radix 通过内联 style 设置定位，Tailwind 的 `absolute left-0` 作为默认值存在，但内联 style 优先级更高，不会冲突。
- **[向后兼容]** → `footer` 为新增可选字段，不配置时行为与当前完全一致。无 breaking change。
