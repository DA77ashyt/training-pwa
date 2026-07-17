/**
 * db.js — IndexedDB 操作封装
 * 数据库: TrainingDB v1
 * 存储: plans (训练计划), logs (训练日志), settings (设置)
 */

const DB_NAME = 'TrainingPWA';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('plans')) {
        const planStore = db.createObjectStore('plans', { keyPath: 'id' });
        planStore.createIndex('by_created', 'createdAt', { unique: false });
      }
      if (!db.objectStoreNames.contains('logs')) {
        const logStore = db.createObjectStore('logs', { keyPath: 'id' });
        logStore.createIndex('by_date', 'date', { unique: false });
        logStore.createIndex('by_session', ['date', 'sessionType'], { unique: false });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

function getTransaction(store, mode = 'readonly') {
  return openDB().then(db => {
    const tx = db.transaction(store, mode);
    return { tx, store: tx.objectStore(store), db };
  });
}

// ==================== Plans ====================

const DB = {
  async getPlan(id) {
    const { store, db } = await getTransaction('plans');
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = () => { db.close(); resolve(req.result || null); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async getLatestPlan() {
    const { store, db } = await getTransaction('plans');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        const plans = req.result || [];
        if (!plans.length) return resolve(null);
        plans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        resolve(plans[0]);
      };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async savePlan(plan) {
    const { store, tx, db } = await getTransaction('plans', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.put(plan);
      req.onsuccess = () => { db.close(); resolve(true); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async deletePlan(id) {
    const { store, tx, db } = await getTransaction('plans', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.delete(id);
      req.onsuccess = () => { db.close(); resolve(true); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  // ==================== Logs ====================

  async getLogs() {
    const { store, db } = await getTransaction('logs');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        const logs = req.result || [];
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(logs);
      };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async getLog(id) {
    const { store, db } = await getTransaction('logs');
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = () => { db.close(); resolve(req.result || null); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async getLogsByDate(date) {
    const { store, db } = await getTransaction('logs');
    return new Promise((resolve, reject) => {
      const index = store.index('by_date');
      const req = index.getAll(date);
      req.onsuccess = () => { db.close(); resolve(req.result || []); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async getLogsByMonth(year, month) {
    const { store, db } = await getTransaction('logs');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        const all = req.result || [];
        const prefix = `${year}-${String(month).padStart(2, '0')}`;
        const filtered = all.filter(log => log.date && log.date.startsWith(prefix));
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(filtered);
      };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async saveLog(log) {
    const { store, tx, db } = await getTransaction('logs', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.put(log);
      req.onsuccess = () => { db.close(); resolve(true); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async deleteLog(id) {
    const { store, tx, db } = await getTransaction('logs', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.delete(id);
      req.onsuccess = () => { db.close(); resolve(true); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  // ==================== Settings ====================

  async getSetting(key) {
    const { store, db } = await getTransaction('settings');
    return new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => { db.close(); resolve(req.result ? req.result.value : null); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  async setSetting(key, value) {
    const { store, tx, db } = await getTransaction('settings', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.put({ key, value });
      req.onsuccess = () => { db.close(); resolve(true); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },

  // ==================== 数据管理 ====================

  async exportAll() {
    const { store: planStore, db: db1 } = await getTransaction('plans');
    const { store: logStore, db: db2 } = await getTransaction('logs');
    const plans = await new Promise(r => {
      const req = planStore.getAll();
      req.onsuccess = () => { db1.close(); r(req.result || []); };
    });
    const logs = await new Promise(r => {
      const req = logStore.getAll();
      req.onsuccess = () => { db2.close(); r(req.result || []); };
    });
    return { plans, logs };
  },

  async clearAll() {
    const { store: pStore, db: db1 } = await getTransaction('plans', 'readwrite');
    const { store: lStore, db: db2 } = await getTransaction('logs', 'readwrite');
    await Promise.all([
      new Promise(r => { pStore.clear(); pStore.transaction.oncomplete = r; }),
      new Promise(r => { lStore.clear(); lStore.transaction.oncomplete = r; })
    ]);
    db1.close(); db2.close();
    return true;
  }
};

export default DB;
