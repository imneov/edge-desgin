# Edge Design System - 状态追踪

## 架构状态

### 三层架构模型 ✅ 已建立

```
@edge/tokens          ← Layer 1: Design Tokens (CSS vars + JS + Tailwind preset)
@edge/ui              ← Layer 2: Pure UI (无业务依赖，通用组件)
@edge/components      ← Layer 3: Business components (知道 Edge 概念，不调 API)
```

## Phase 1 完成状态 (2026-03-29)

### ✅ 已完成

#### 1. @edge/tokens 包
- Design token 体系建立
- Colors, Typography, Spacing, Shadows, Breakpoints
- cockpitColors, topologyColors, statusColors
- 支持浅色/深色主题

#### 2. @edge/ui 包 (Layer 2)
从 edge-console 提炼的通用 UI 组件:
- **SearchableSelect<T>** - 支持搜索、异步加载、滚动分页的泛型下拉选择器
- **StatusIndicator** - 通用状态指示器 (success/warning/error/info, 支持动画)
- **ConfirmDialog** - 通用确认对话框 (支持输入文本确认)
- **ProgressRing** - 通用环形进度 (SVG)
- **CollapsibleSection** - 带标题的可折叠面板

基础 UI 组件 (Button, Badge, Card, Dialog, Table, Tabs, Select, Input, Checkbox, Form, Spinner, EmptyState, Pagination, LabelEditor, Alert, Sheet, ScrollArea, Collapsible, Toggle, Separator, Tooltip, DropdownMenu, Progress, Avatar, RadioGroup, Switch, Textarea, Label)

#### 3. @edge/components 包 (Layer 3)
从 edge-console 提取的业务组件:
- **ContainerStatus** - 容器状态显示 (Pod Phase、容器就绪数、状态详情)
- **ResourceNameDescription** - 资源名称描述 (支持别名、描述、图标)
- **ReplicaAdjustmentCard** - 副本调整卡片 (圆环进度、增减按钮)
- **ReplicaConfirmationDialog** - 副本确认对话框 (倒计时自动确认)
- **MonitoringChart** - 监控图表 (知道时序数据格式、zh-CN locale)

#### 4. 文档站点
- Nextra 3.3.1 配置完成
- 运行在端口 3030 (supervisor 管理)
- 组件文档、Storybook 集成
- 无 hydration 错误

## Phase 2 进行中

### 🚧 子任务

已创建 3 个子任务，分配给 Frontend Engineer:

1. **EDG-23** - Create @edge/components business selector components (High)
   - ClusterSelector, NamespaceSelector, WorkspaceSelector, NodeGroupSelector
   - 使用 @edge/ui 的 SearchableSelect 作为底层 UI
   - 知道业务概念但不调用 API

2. **EDG-24** - Create data fetching hooks for selectors (High)
   - useClusters, useNamespaces, useWorkspaces, useNodeGroups
   - 从 ClusterSelector 提取 API 调用逻辑
   - 放在 edge-console/hooks 目录

3. **EDG-25** - Refactor edge-console ClusterSelector to use new architecture (Medium)
   - 更新所有使用 ClusterSelector 的页面
   - 使用新的架构组合
   - 删除旧文件

### 需要重构的 selector 组件

发现的 edge-console selector (均有直接调 API 的问题):
- cluster-selector.tsx (280行) - 调用 getCluster(), listClusters()
- namespace-selector.tsx (354行) - 调用 listNamespaces()
- workspace-selector.tsx - 调用 listWorkspaces()
- nodegroup-selector.tsx - 调用 tenantListNodegroups()
- workspace-namespace-selector.tsx
- namespace-creation-selector.tsx
- node-selector.tsx

## Phase 3 (后续)

- 老页面逐步迁移到新组件
- 完整的 Storybook 覆盖
- 文档站点与 live examples

## 技术债务

### 当前 edge-console 中的问题
- Selector 组件直接调用 API，违反分层架构
- UI 和业务逻辑混合，无法复用
- 数据获取逻辑分散在各个组件中
- 测试困难

### 设计待完善
- edge-console CLAUDE.md 中的硬编码色值 (#EFF4F9, #F9FBFD, #F5F7FA) 需要提取到 tokens
- cockpitColors 和 topologyColors (hex) 与 semantic tokens (HSL) 需要统一
- 间距规范 (p-4, gap-3) 和字体规则 (table text-xs) 需要进入 tokens

## 包依赖关系

```
@edge/tokens        ← 无依赖
@edge/ui            ← 依赖 @edge/tokens
@edge/components    ← 依赖 @edge/ui + @edge/tokens
edge-console        ← 依赖以上三个 + API hooks
```
