/*
 * @Date: 2024-01-02 21:49:24
 * @Description:
 */
// router.tsx
import React, { FC } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Edit from "@/pages/Edit/index";
// import Preview from "./pages/edit/Preview";
// import Embed from "./pages/embed/Index";

// 假设这些是您的配置项
const routerMode = "hash"; // 或 'history'
const base = "/"; // 根据实际情况配置

// 路由元素
const RouterElement: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Edit />} />
        <Route path="/:id" element={<Edit />} />
        <Route path="/share/:id" element={<Edit />} />
        {/* <Route path="/preview" element={<Preview />} />
        <Route path="/embed/:id" element={<Embed />} />
        <Route path="/embed/" element={<Embed />} /> */}
        {/* 其他路由 */}
      </Routes>
  );
};

// 根据配置选择路由类型
const AppRouter: FC = () => {
  return routerMode === "hash" ? (
    <HashRouter basename={base}>{RouterElement({})}</HashRouter>
  ) : (
    <BrowserRouter basename={base}>{RouterElement({})}</BrowserRouter>
  );
};

export default AppRouter;
