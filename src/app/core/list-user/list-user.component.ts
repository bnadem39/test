import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data) => {
                this.users = data as User[];
            },
            (error) => {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            }
        );
    }

    deleteUser(id: number): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            this.userService.deleteUser(id).subscribe(
                () => {
                    this.users = this.users.filter(u => u.id !== id);
                },
                (error) => {
                    console.error('Erreur lors de la suppression:', error);
                }
            );
        }
    }

    getRoleBadgeClass(role: string): string {
        switch (role) {
            case 'admin':
                return 'bg-danger';
            case 'moderator':
                return 'bg-warning';
            default:
                return 'bg-primary';
        }
    }

    getStatusBadgeClass(status: string): string {
        return status === 'active' ? 'bg-success' : 'bg-secondary';
    }
}
