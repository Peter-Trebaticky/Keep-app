import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  // Inicializácia stavu store
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes') || '[]') as string[],
  }),
  actions: {
    addNote(note: string) {
      // Pridanie novej poznámky do zoznamu
      this.notes.push(note);
      // Uloženie aktualizovaného zoznamu poznámok do Local Storage
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }
});
