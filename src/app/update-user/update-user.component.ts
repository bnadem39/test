import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
    updateUserForm!: FormGroup;
    userId!: number;
    user: User | null = null;
    loading: boolean = true;
    error: string = '';

    roles: string[] = ['user', 'admin', 'moderator'];
    statuses: string[] = ['active', 'inactive'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
        this.initForm();
        this.loadUser();
    }

    initForm(): void {
        this.updateUserForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            role: new FormControl('', Validators.required),
            status: new FormControl('', Validators.required)
        });
    }

    loadUser(): void {
        this.userService.getUserById(this.userId).subscribe(
            (response) => {
                this.user = response.user;
                this.updateUserForm.patchValue({
                    name: this.user.name,
                    email: this.user.email,
                    role: this.user.role,
                    status: this.user.status
                });
                this.loading = false;
            },
            (error) => {
                console.error('Erreur lors du chargement:', error);
                this.error = 'Utilisateur non trouvé';
                this.loading = false;
            }
        );
    }

    get name() { return this.updateUserForm.get('name'); }
    get email() { return this.updateUserForm.get('email'); }
    get role() { return this.updateUserForm.get('role'); }
    get status() { return this.updateUserForm.get('status'); }

    submitUpdate(): void {
        if (this.updateUserForm.valid) {
            this.userService.updateUser(this.userId, this.updateUserForm.value).subscribe(
                (response) => {
                    console.log('Utilisateur mis à jour avec succès:', response);
                    this.router.navigateByUrl('/list-users');
                },
                (error) => {
                    console.error('Erreur lors de la mise à jour:', error);
                    if (error.error?.error === "Cet email est déjà utilisé") {
                        alert('Cet email est déjà utilisé par un autre utilisateur.');
                    }
                }
            );
        }
    }
}
