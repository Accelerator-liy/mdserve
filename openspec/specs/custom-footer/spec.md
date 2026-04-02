## ADDED Requirements

### Requirement: Footer 文本配置
系统 SHALL 支持在 `.mdserve.yaml` 的 `site` 配置节中通过 `footer` 字段定义 footer 文本内容。该字段为可选字符串，不配置时 footer 不显示。

#### Scenario: 配置了 footer 文本
- **WHEN** 用户在 `.mdserve.yaml` 中设置 `site.footer: "© 2026 My Company"`
- **THEN** 前端页面底部 SHALL 显示文本 "© 2026 My Company"

#### Scenario: 未配置 footer
- **WHEN** 用户未在 `.mdserve.yaml` 中设置 `site.footer` 或值为空字符串
- **THEN** 前端页面 SHALL 不显示 footer 区域，主内容区占满全屏高度

### Requirement: Footer 数据通过 API 传递
后端 `/api/config` 端点 SHALL 在响应中包含 `footer` 字段，值为配置文件中的 footer 文本或空字符串。

#### Scenario: 获取包含 footer 的配置
- **WHEN** 前端请求 `GET /api/config` 且配置文件中 `site.footer` 为 "© 2026"
- **THEN** 响应 JSON SHALL 包含 `"footer": "© 2026"`

#### Scenario: 获取未配置 footer 的配置
- **WHEN** 前端请求 `GET /api/config` 且配置文件中未设置 `site.footer`
- **THEN** 响应 JSON SHALL 包含 `"footer": ""`

### Requirement: Footer 渲染组件
前端 SHALL 提供 `Footer` 组件，渲染 footer 文本为纯文本。组件 SHALL 仅在 footer 文本非空时渲染 DOM 元素。

#### Scenario: Footer 文本非空
- **WHEN** Footer 组件接收到非空文本 "© 2026"
- **THEN** 组件 SHALL 渲染包含该文本的 `<footer>` 元素

#### Scenario: Footer 文本为空
- **WHEN** Footer 组件接收到空字符串
- **THEN** 组件 SHALL 返回 `null`，不渲染任何 DOM 元素

### Requirement: Footer 布局位置
Footer SHALL 渲染在页面主内容区（`<main>`）下方，作为页面垂直 flex 布局的最后一个子元素。Footer SHALL 不随内容滚动。

#### Scenario: 页面布局验证
- **WHEN** 页面包含 header、main 内容区和 footer
- **THEN** 布局结构 SHALL 为 `header → main (flex-1) → footer (flex-shrink-0)`，footer 固定在视口底部

### Requirement: 导航菜单下拉面板跟随菜单项定位
顶部导航菜单的下拉面板 SHALL 始终显示在当前激活菜单项的正下方，而非固定在导航栏的某个固定位置。

#### Scenario: 悬停不同菜单项
- **WHEN** 用户将鼠标从第一个菜单项移动到第二个菜单项
- **THEN** 下拉面板 SHALL 从第一个菜单项下方移动到第二个菜单项下方

#### Scenario: 单个菜单项
- **WHEN** 页面只有一个带下拉子菜单的菜单项
- **THEN** 下拉面板 SHALL 显示在该菜单项正下方
