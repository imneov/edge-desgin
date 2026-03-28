# 组件提取边界规则

## 可以进 design 仓库的组件

### 纯 UI 组件
- Button、Dialog、Badge 等基础组件
- 不依赖业务逻辑的无状态组件

### 通用模式组件
- LabelEditor（键值对编辑）
- ConfirmDeleteDialog（删除确认）
- EmptyState（空状态）
- 不依赖 edge-specific 数据的类型

### 工具函数和 Hooks
- `cn` - 类名合并工具
- `useWizard` - 向导状态管理 Hook

## 禁止进入的组件

### 业务选择器
- ❌ ClusterSelector
- ❌ NamespaceSelector
- ❌ NodeSelector
- 原因：内部直接调用 edge-apiserver API

### 包含业务逻辑的组件
- ❌ WorkloadsList（包含工作负载列表逻辑）
- ❌ MetricCard（如果依赖监控 API）
- 原因：与 Edge Platform 业务强耦合

### 依赖 Kubb 生成类型的组件
- ❌ 任何引用 `src/gen/*` 类型的组件
- 原因：Kubb 生成类型与 OpenAPI 紧耦合

## 依赖规则

### 允许的依赖
- `@radix-ui/*` - 无头 UI 组件
- `lucide-react` - 图标库
- `class-variance-authority` - CVA 变体
- `clsx` / `tailwind-merge` - 类名工具

### 禁止的依赖
- ❌ `@tanstack/react-query` - 应由使用者注入
- ❌ 任何 Kubb 生成的 API client
- ❌ `src/gen/*` 中的类型

## 类型处理原则

组件 props 中不直接使用 K8s API 类型，需要在 `packages/ui/src/types` 中重新定义泛型。

❌ **错误**：
```tsx
import { Namespace } from '@/gen/types'
interface Props {
  namespace: Namespace
}
```

✅ **正确**：
```tsx
interface Resource {
  metadata: { name: string }
}
interface Props<T extends Resource> {
  resource: T
}
```

## 示例

### LabelEditor 提取示例

**原始组件（edge-console）**：
```tsx
import { updateClusterResource } from '@/gen/api'
export function EditLabelsDialog({ clusterId, ... }) {
  const handleSave = async () => {
    await updateClusterResource({ ... })
  }
}
```

**提取后（@edge/ui）**：
```tsx
interface LabelEditorProps<T> {
  value: Array<{ key: string; value: string }>
  onChange: (value: Array<{ key: string; value: string }>) => void
}
export function LabelEditor<T>({ value, onChange }: LabelEditorProps<T>) {
  // 纯 UI 逻辑
}
```

**在 edge-console 中使用**：
```tsx
import { LabelEditor } from '@edge/ui'
import { updateClusterResource } from '@/gen/api'
export function EditLabelsDialog({ clusterId, ... }) {
  const handleSave = async (labels) => {
    await updateClusterResource({ ... })
  }
  return <LabelEditor value={labels} onChange={handleChange} />
}
```
