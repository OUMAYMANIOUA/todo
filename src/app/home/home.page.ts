import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: { title: string; done: boolean }[] = []; // Déclaration et initialisation comme vide du tableau de tâches
  newTask: string = ''; // Variable pour stocker la nouvelle tâche saisie
  editingTaskIndex: number | null = null; // Index de la tâche en cours d'édition
  editedTaskTitle: string = ''; // Titre de la tâche en cours d'édition
  constructor(private alertController: AlertController) {}

  addTask() {
    if (this.newTask.trim() !== '') { // Vérifie que la nouvelle tâche n'est pas vide
      this.tasks.push({ title: this.newTask, done: false }); // Ajoute la tâche
      this.newTask = ''; // Réinitialise le champ de saisie
    }
  }

  toggleTaskStatus(index: number) {
    this.tasks[index].done = !this.tasks[index].done; // Bascule le statut de la tâche
  }

  async confirmDeleteTask(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTask(index);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1); // Supprime la tâche
  }

  startEditingTask(index: number) {
    this.editingTaskIndex = index; // Définit l'index de la tâche en cours d'édition
    this.editedTaskTitle = this.tasks[index].title; // Prend le titre actuel de la tâche
  }

  saveEditedTask() {
    if (this.editingTaskIndex !== null && this.editedTaskTitle.trim() !== '') {
      this.tasks[this.editingTaskIndex].title = this.editedTaskTitle; // Sauvegarde le nouveau titre
      this.editingTaskIndex = null; // Réinitialise l'index de la tâche en cours d'édition
      this.editedTaskTitle = ''; // Réinitialise le titre de la tâche en cours d'édition
    }
  }

  cancelEditingTask() {
    this.editingTaskIndex = null; // Annule l'édition
    this.editedTaskTitle = ''; // Réinitialise le titre de la tâche en cours d'édition
  }
}
