// tools/memoryManager.js - أداة استرجاع الذكريات والتحديثات السابقة
const path = require('path');
const fs = require('fs');

// مسار ملف الذاكرة
const dbFile = path.join(__dirname, '../memory.json');

// تهيئة الملف إذا لم يكن موجوداً
function ensureMemoryFile() {
  // التأكد من وجود مجلد data
  const dataDir = path.dirname(dbFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // التأكد من وجود ملف memory.json
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ memories: [] }, null, 2));
  }
}

// قراءة البيانات من الملف
function readMemories() {
  ensureMemoryFile();
  try {
    const data = fs.readFileSync(dbFile, 'utf8');
    const parsed = JSON.parse(data);
    return parsed.memories || [];
  } catch (error) {
    console.error('Error reading memories:', error);
    return [];
  }
}

// كتابة البيانات إلى الملف
function writeMemories(memories) {
  ensureMemoryFile();
  try {
    const data = { memories };
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing memories:', error);
  }
}

/**
 * يخزّن قيمة مع مفتاح
 */
async function storeMemory(key, value) {
  const memories = readMemories();
  memories.push({ key, value, timestamp: Date.now() });
  writeMemories(memories);
}

/**
 * يرجع الذكريات الأكثر صلة
 */
async function fetchMemory(query) {
  const memories = readMemories();
  return memories
    .filter(m =>
      String(m.key).includes(query) ||
      JSON.stringify(m.value).includes(query)
    )
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);
}

module.exports = { storeMemory, fetchMemory };