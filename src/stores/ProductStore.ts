import { defineStore } from 'pinia';

interface Note {
  title: string;
  content: string;
  color: string;
  timeCreated: string;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes') || '[]') as Note[],
  }),
  actions: {
    addNote(newNote: Note) {
      const now = new Date();
      newNote.timeCreated = now.toLocaleString("sk-SK", {
      day: '2-digit',// Formátovanie dátumu a času 
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
      }); 
      // Pridanie novej poznámky na začiatok zoznamu
      this.notes.unshift(newNote);
      // Uloženie aktualizovaného zoznamu poznámok do local storage
      this.saveNotes();
    },
    setNotes(newNotes: Note[]) {
      // Nastavenie nového stavu poznámok
      this.notes = newNotes;
      // Uloženie nového stavu poznámok do local storage
      this.saveNotes();
    },
    saveNotes() {
      // Pomocná funkcia pre ukladanie poznámok do local storage
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    removeNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
    },
  }
});
