import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  // Inicializace stavu store
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes') || '[]') as string[],
  }),
  actions: {
    addNote(note: string) {
      // Přidání nové poznámky do seznamu
      this.notes.push(note);
      // Uložení aktualizovaného seznamu poznámek do Local Storage
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    setNotes(newNotes: string[]) {
      // Nastavení nového stavu poznámek
      this.notes = newNotes;
      // Uložení nového stavu poznámek do Local Storage
      localStorage.setItem('notes', JSON.stringify(newNotes));
    }
  }
});
