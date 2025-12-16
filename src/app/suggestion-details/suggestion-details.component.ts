import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../services/suggestion.service';
import { Suggestion } from '../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {

  id!: number;
  suggestion!: Suggestion;

  constructor(private activatedRoute: ActivatedRoute, private suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.suggestionService.getSuggestionById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        
        this.suggestion = data.suggestion as Suggestion;
      }
    )
  }

}
