import { addFunction } from './engine.js';

const functionMap = window.module.exports;
Object.entries(functionMap).forEach(([name, func]) => {
  if (!('category' in func)) {
    func.category = 'Miscellaneous';
  }
  addFunction(name, func);
});
