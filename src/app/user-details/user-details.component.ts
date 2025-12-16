import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
    user: User | null = null;
    userId!: number;
    loading: boolean = true;
    error: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadUser();
    }

    loadUser(): void {
        this.userService.getUserById(this.userId).subscribe(
            (response) => {
                this.user = response.user;
                this.loading = false;
            },
            (error) => {
                console.error('Erreur lors du chargement:', error);
                this.error = 'Utilisateur non trouvé';
                this.loading = false;
            }
        );
    }

    deleteUser(): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            this.userService.deleteUser(this.userId).subscribe(
                () => {
                    this.router.navigateByUrl('/list-users');
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
