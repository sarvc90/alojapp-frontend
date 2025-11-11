import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register-page',
    template: `
        <app-auth-template
                title="Crea tu cuenta"
                subtitle="Únete a nuestra comunidad de alojamientos">

            <div *ngIf="successMessage"
                 class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p class="text-green-700 text-sm">{{ successMessage }}</p>
            </div>

            <div *ngIf="errorMessage"
                 class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p class="text-red-700 text-sm">{{ errorMessage }}</p>
            </div>

            <app-organism-register-form
                    [form]="form"
                    (submitForm)="onSubmit()"
                    (goToLogin)="navigateToLogin()">
            </app-organism-register-form>
        </app-auth-template>
    `
})
export class RegisterPageComponent {
    form: FormGroup;
    errorMessage?: string;
    successMessage?: string;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            tipoUsuario: ['HUESPED', Validators.required],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
            fechaNacimiento: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            descripcionPersonal: [''],
            fotoPerfilUrl: [''],
            documentosLegalesUrl: ['']
        }, { validators: this.passwordMatchValidator });

        // Observar cambios en tipoUsuario para ajustar validaciones
        this.form.get('tipoUsuario')?.valueChanges.subscribe(tipo => {
            const descripcion = this.form.get('descripcionPersonal');
            if (tipo === 'ANFITRION') {
                descripcion?.setValidators([Validators.required, Validators.minLength(20)]);
            } else {
                descripcion?.clearValidators();
            }
            descripcion?.updateValueAndValidity();
        });
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword) {
            return null;
        }

        if (confirmPassword.value === '') {
            return null;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            const errors = confirmPassword.errors;
            if (errors) {
                delete errors['passwordMismatch'];
                if (Object.keys(errors).length === 0) {
                    confirmPassword.setErrors(null);
                }
            }
            return null;
        }
    }

    onSubmit() {
        this.errorMessage = undefined;
        this.successMessage = undefined;

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.errorMessage = 'Por favor completa todos los campos requeridos correctamente';
            return;
        }

        const { tipoUsuario, confirmPassword, ...formData } = this.form.value;

        if (tipoUsuario === 'HUESPED') {
            // Registro de huésped
            const huespedData = {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                telefono: formData.telefono,
                fechaNacimiento: formData.fechaNacimiento
            };

            this.auth.registroHuesped(huespedData).subscribe({
                next: (response) => {
                    this.successMessage = '¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...';
                    setTimeout(() => this.router.navigate(['/auth/login']), 2000);
                },
                error: (error) => {
                    if (error.status === 409) {
                        this.errorMessage = 'El correo electrónico ya está registrado';
                    } else if (error.error?.message) {
                        this.errorMessage = error.error.message;
                    } else {
                        this.errorMessage = 'Error al crear la cuenta. Por favor intenta nuevamente';
                    }
                }
            });
        } else {
            // Registro de anfitrión
            const anfitrionData = {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                telefono: formData.telefono,
                fechaNacimiento: formData.fechaNacimiento,
                descripcionPersonal: formData.descripcionPersonal || undefined,
                fotoPerfilUrl: formData.fotoPerfilUrl || undefined,
                documentosLegalesUrl: formData.documentosLegalesUrl || undefined
            };

            this.auth.registroAnfitrion(anfitrionData).subscribe({
                next: (response) => {
                    this.successMessage = '¡Cuenta de anfitrión creada exitosamente! Redirigiendo al inicio de sesión...';
                    setTimeout(() => this.router.navigate(['/auth/login']), 2000);
                },
                error: (error) => {
                    if (error.status === 409) {
                        this.errorMessage = 'El correo electrónico ya está registrado';
                    } else if (error.error?.message) {
                        this.errorMessage = error.error.message;
                    } else {
                        this.errorMessage = 'Error al crear la cuenta. Por favor intenta nuevamente';
                    }
                }
            });
        }
    }

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }
}