import { Component } from '@angular/core';
import { Suggestion } from '../models/suggestion';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../services/suggestion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-suggestion',
  templateUrl: './update-suggestion.component.html',
  styleUrl: './update-suggestion.component.css'
})
export class UpdateSuggestionComponent {
  id!: number;
  updateSuggestionForm!: FormGroup;
   suggestion: Suggestion = {
    id: 0,
    title: '',
    description: '',
    category: '',
    date: this.getTodayDate(),
    status: 'en_attente',
    nbLikes: 0
   };
  
   getTodayDate() {
    const today= new Date();
    return today.toISOString().split('T')[0];
   }
  
   categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
    ];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, 
              private suggestionService: SuggestionService ) { }
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.suggestionService.getSuggestionById(this.id).subscribe(
      (data: any) => {
        this.suggestion = data.suggestion as Suggestion;
        let dateS: string = (this.suggestion.date).toLocaleString().split('T')[0];
        console.log(dateS);
        
        //this.suggestion.date = this.suggestion.date.toISOString().split('T')[0]
        console.log(this.suggestion.date);
        this.updateSuggestionForm = new FormGroup({
            title: new FormControl(this.suggestion.title, [Validators.required, Validators.minLength(5),Validators.pattern("^[A-Z][a-zA-Z]*$")]),
            description: new FormControl(this.suggestion.description, [Validators.required, Validators.minLength(10)]),
            category: new FormControl(this.suggestion.category, Validators.required),
            /*date: new FormControl({value: this.suggestion.date, disabled: true}),
            status: new FormControl({value: this.suggestion.status, disabled: true})*/
            date: new FormControl(dateS),
            status: new FormControl(this.suggestion.status),
            nbLikes: new FormControl(this.suggestion.nbLikes)
          });
      }
    )
  }

  get title(){ return this.updateSuggestionForm.get('title');  }
  get description(){ return this.updateSuggestionForm.get('description');  }
  get category(){ return this.updateSuggestionForm.get('category');  }
  get date(){ return this.updateSuggestionForm.get('date');  }
  get status(){ return this.updateSuggestionForm.get('status');  }

  submitSuggestion(){
    //console.log(this.updateSuggestionForm.value);
    this.suggestionService.updateSuggestion(this.id,this.updateSuggestionForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/suggestions');

      }
    );
    //this.router.navigate(['/suggestions']);
  }

}
