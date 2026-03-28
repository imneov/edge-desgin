# Edge Design UI 组件提取进度

## 已完成组件

### 基础组件
- Button, Input, LabelEditor
- Badge, Card, Dialog
- Spinner, LoadingOverlay, EmptyState
- Table, Tabs, Select
- Checkbox, RadioGroup, Switch, Textarea
- Tooltip, DropdownMenu, Separator
- Alert, Sheet, ScrollArea
- Collapsible, Toggle, ToggleGroup
- Label, Progress, Avatar

### 边缘平台组件（从 edge-console 提取）
- ContainerStatus - 容器状态显示（带 Pod Phase、容器就绪数、状态详情）
- ResourceNameDescription - 资源名称描述（支持别名、描述、图标）
- Pagination - 分页组件（支持自定义每页条数）
- ReplicaAdjustmentCard - 副本调整卡片（圆环进度、增减按钮）
- ReplicaConfirmationDialog - 副本确认对话框（倒计时自动确认）

## 待提取组件

### 高优先级（平台核心）
- cluster-selector - 集群选择器
- namespace-selector - 命名空间选择器
- nodegroup-selector - 节点组选择器
- workspace-selector - 工作空间选择器
- monitoring-dashboard - 监控仪表板
- monitoring-chart - 监控图表

### 中优先级
- create-resource-dialog - 创建资源对话框
- delete-confirmation-dialog - 删除确认对话框
- replica-confirmation-dialog - 副本确认对话框 ✅
- replica-adjustment-card - 副本调整卡片 ✅

### 低优先级
- modal - 模态框（复杂，含 Monaco 编辑器）
- chart - 图表组件
- Portal - Portal 组件
- alert-dialog - 警告对话框

## 工作状态

从 edge-console 提取边缘计算平台相关组件到 edge-design 包
