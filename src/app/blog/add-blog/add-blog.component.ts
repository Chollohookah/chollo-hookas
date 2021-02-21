import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { BlogPostDto } from '../interfaces/blogPostDTO';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent implements OnInit {
  public formGroup: FormGroup;
  /*public configQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };*/

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      img: ['', []],
      contentForm: ['', Validators.required],
    });
  }

  public handleImageUpload(event) {
    let value = event.target;
    let file: File = value.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.formGroup.patchValue({ img: myReader.result });
    };
    myReader.readAsDataURL(file);
  }

  ngOnInit(): void {}

  public savePost() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let valuesToSend: BlogPostDto = {
        imgPostBase64: this.formGroup.value.img,
        nombre: this.formGroup.value.name,
        desc: this.formGroup.value.desc,
        htmlContent: this.formGroup.value.contentForm,
        userId: this.authService.returnUserId(),
        draft: false,
      };
      this.http.post(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts', valuesToSend).subscribe(
        (data) => {
          this.toast.success(`Post con nombre ${valuesToSend.nombre} guardado exitosamente`, 'Exito');
          this.router.navigate(['dashboard/blog/list'], { replaceUrl: true });
        },
        (error) => {
          this.toast.error(error.error.message, 'Ha ocurrido un error');
        }
      );
    } else {
      this.toast.error('Te olvidas de algun campo obligatorio', 'Error en el formulario');
    }
  }
}
