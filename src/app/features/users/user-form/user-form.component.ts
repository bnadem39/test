import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
    addUserForm!: FormGroup;
    user: User = {
        id: 0,
        name: '',
        email: '',
        role: 'user',
        status: 'active'
    };

    roles: string[] = ['user', 'admin', 'moderator'];
    statuses: string[] = ['active', 'inactive'];

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.addUserForm = new FormGroup({
            name: new FormControl(this.user.name, [
                Validators.required,
                Validators.minLength(2),
                Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
            ]),
            email: new FormControl(this.user.email, [
                Validators.required,
                Validators.email
            ]),
            role: new FormControl(this.user.role, Validators.required),
            status: new FormControl(this.user.status, Validators.required)
        });
    }

    get name() { return this.addUserForm.get('name'); }
    get email() { return this.addUserForm.get('email'); }
    get role() { return this.addUserForm.get('role'); }
    get status() { return this.addUserForm.get('status'); }

    submitUser(): void {
        if (this.addUserForm.valid) {
            this.userService.addUser(this.addUserForm.value).subscribe(
                (response) => {
                    console.log('Utilisateur créé avec succès:', response);
                    this.router.navigateByUrl('/list-users');
                },
                (error) => {
                    console.error('Erreur lors de la création:', error);
                    if (error.error?.error === "Cet email est déjà utilisé") {
                        alert('Cet email est déjà utilisé par un autre utilisateur.');
                    }
                }
            );
        }
    }
}
