import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../services/movie.service";
import {environment} from "../../environments/environment";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  watchListedMovies: any =  [];
  seenMovies: any = [];
  displayedMovies: any = [];
  segment = 'watchlist';
  watchlist: number[] = [];
  seen: number[] = [];
  imageBaseUrl = environment.images;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private storage: Storage) { }
  handleRefresh(event: any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {

    this.storage.get('watchlist').then((watchlist: number[]) => {
      if (watchlist) {
        this.watchlist = watchlist;
        this.fetchWatchlistMovies(); // Fetch movie details using the IDs
      }
    });
    this.storage.get('seen').then((seen: number[]) => {
      if (seen) {
        this.seen = seen;
        this.fetchSeenMovies(); // Fetch movie details using the IDs
      }
    });
    this.selectMovie();
  }

  fetchSeenMovies() { // Fetch movie details using the IDs
    for (const movieId of this.seen) {
      const str = String(movieId)
      this.movieService.getMovieDetails(str).subscribe((res) => {
        console.log(res);
        this.seenMovies.push(res);
      });
    }
  }
  fetchWatchlistMovies() {
    for (const movieId of this.watchlist) {
      const str = String(movieId)
      this.movieService.getMovieDetails(str).subscribe((res) => {
        console.log(res);
        this.watchListedMovies.push(res);

      });
    }
  }
  selectMovie() {
    if (this.segment === 'watchlist') {
      this.displayedMovies = this.watchListedMovies;
    } else {
      this.displayedMovies = this.seenMovies;
    }
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    this.selectMovie();
  }

}
