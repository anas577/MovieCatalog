import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movie.service";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  movies: any = [];
  filteredMovies: any = [];
  topRatedMovies: any[] = [];
  searchResults: any[] = [];
  searchTerm: string = '';
  currentPage =1;
  imageBaseUrl = environment.images;
  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.topRatedMovies.push(...res.results);
      console.log(res);
      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    })
    this.filteredMovies = this.movies;
  }
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    if (this.searchTerm.trim() !== '') {
      // Load more search results
      this.loadSearchResults(event);
    } else {
      // Load more top-rated movies
      this.loadMovies(event);
    }
  }
  loadSearchResults(event: InfiniteScrollCustomEvent) {
    this.movieService.searchMovies(this.searchTerm, this.currentPage).subscribe((res) => {
      this.searchResults.push(...res.results);
      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
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
    this.filteredMovies = this.movies;
  }
}

