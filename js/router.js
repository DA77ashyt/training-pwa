/**
 * router.js — 简单 SPA 哈希路由
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    // 解析路径和参数
    let path = hash;
    let params = {};
    if (hash.includes('?')) {
      const parts = hash.split('?');
      path = parts[0];
      const searchParams = new URLSearchParams(parts[1]);
      for (const [k, v] of searchParams) {
        params[k] = v;
      }
    }

    const handler = this.routes[path];
    if (handler) {
      this.currentPage = path;
      handler(params);
    } else {
      // 回退到首页
      this.navigate('/');
    }
  }

  start() {
    this.resolve();
  }
}

const router = new Router();
export default router;
