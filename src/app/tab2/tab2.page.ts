import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {MovieService} from "../services/movie.service";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  searchResults: any = [];
  searchTerm: string = '';
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.loadSearchResults();
  }

  loadSearchResults() {
    this.movieService.searchMovies(this.searchTerm, this.currentPage).subscribe((res) => {
      this.searchResults.push(...res.results);
    });
  }

  performSearch() {
    if (this.searchTerm.trim() !== '') {
      this.movieService.searchMovies(this.searchTerm).subscribe(result => {
        this.searchResults = result.results;
      });
    } else {
      this.searchResults = [];
    }
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
