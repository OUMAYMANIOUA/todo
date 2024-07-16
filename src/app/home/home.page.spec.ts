import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: { title: string; done: boolean }[] = []; // Tableau des tâches
  newTask: string = ''; // Variable pour stocker la nouvelle tâche saisie

  constructor() {}

  addTask() {
    if (this.newTask.trim() !== '') { // Vérifie que la nouvelle tâche n'est pas vide
      this.tasks.push({ title: this.newTask, done: false }); // Ajoute la nouvelle tâche au tableau des tâches
      this.newTask = ''; // Réinitialise le champ d'entrée de la nouvelle tâche
    }
  }

  toggleTaskStatus(index: number) {
    this.tasks[index].done = !this.tasks[index].done; // Inverse l'état de la tâche (terminée ou non terminée)
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1); // Supprime la tâche du tableau des tâches
  }

}
