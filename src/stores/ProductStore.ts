import { defineStore } from 'pinia';

// Definícia rozhrania pre objekt Note
export interface Note {
  title: string;
  content: string;
  color: string;
  timeCreated: string;
}

// Definovanie úložiska pre prácu s notes
export const useNotesStore = defineStore('notes', {
  // Počiatočný stav úložiska
  state: () => ({
    // Načítanie poznámok z local storage alebo vytvorenie prázdneho zoznamu
    notes: JSON.parse(localStorage.getItem('notes') || '[]') as Note[],
  }),
  actions: {
    // Pridanie novej poznámky
    addNote(newNote: Note) {
      // Formátovanie dátumu a času 
      const now = new Date();
      newNote.timeCreated = now.toLocaleString("sk-SK", {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      }); 
      // Pridanie poznámky na začiatok zoznamu
      this.notes.unshift(newNote);
      // Uloženie zoznamu poznámok do local storage
      this.saveNotes();
    },
    // Nastavenie nového zoznamu poznámok
    setNotes(newNotes: Note[]) {
      this.notes = newNotes;
      this.saveNotes();
    },
    // Ukladanie poznámok do local storage
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    // Odstránenie poznámky podľa indexu
    removeNote(index: number) {
      this.notes.splice(index, 1);
      this.saveNotes();
    },
  }
});
