# Edge Design System

> Edge Platform 统一设计系统

## 项目结构

```
edge-design/
├── packages/
│   ├── ui/              # @edge/ui - 组件库
│   └── tokens/          # @edge/tokens - Design tokens（可选）
├── docs/                # Nextra 文档站点
└── .changeset/          # Changesets 配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动 Storybook（组件文档）
pnpm storybook

# 启动文档站点
pnpm docs:dev
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档站点
pnpm build:docs
```

## 技术栈

- **Monorepo**: pnpm workspace
- **组件库**: React + TypeScript + Tailwind CSS
- **文档**: Nextra (Next.js) + Storybook
- **构建**: tsup
- **版本管理**: Changesets

## 工作流

1. 从 edge-console 提取组件到 `packages/ui/src/components/`
2. 在 `packages/ui/src/index.ts` 导出组件
3. 在 Storybook 中编写组件文档（`*.stories.tsx`）
4. 运行 `pnpm changeset` 记录变更
5. 发布新版本

## 组件提取边界

详见 [docs/EXTRACTION_GUIDE.md](./docs/EXTRACTION_GUIDE.md)

## License

MIT
