import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiResult, MovieService} from "../services/movie.service";
import {environment} from "../../environments/environment";
import { Storage } from '@ionic/storage';
import { register} from "swiper/element/bundle";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";
register();

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  imageBaseUrl = environment.images;
  recommendedMovies: any[] = [];
  credits: any[] = [];
  isInWatchlist: boolean = false;
  isInSeen: boolean = false;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private storage: Storage) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.movieService.getMovieDetails(id).subscribe((res)=>{
      this.movie = res;

    });
    this.storage.get('watchlist').then((watchlist: number[]) => {
      if (!watchlist) {
        watchlist = [];
      }
      this.isInWatchlist = watchlist.includes(parseInt(id));
    }
    );
    this.storage.get('seen').then((seen: number[]) => {
      if (!seen) {
        seen = [];
      }
      this.isInSeen = seen.includes(parseInt(id));
    }
    );
    this.loadRecommendations(id);
    this.loadCredits(id);
  }
  openHomePage(){
    window.open(this.movie.homepage);
  }
  async addToWatchlist(movieId: number) {
    // Get existing watchlist
    this.storage.get('watchlist').then(async (watchlist: number[]) => {
      if (!watchlist) {
        watchlist = [];
      }
      // Add the new movie ID if it's not already in the watchlist
      if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        // Save updated watchlist
        await this.storage.set('watchlist', watchlist);
      }
    });
    this.isInWatchlist = true;
    console.log("added to watchlist");
    console.log(this.isInWatchlist);
  }
  async removeFromWatchlist(movieId: number) {
    // Get existing watchlist
    this.storage.get('watchlist').then(async (watchlist: number[]) => {
      if (!watchlist) {
        watchlist = [];
      }
      // Remove the movie ID if it's in the watchlist
      if (watchlist.includes(movieId)) {
        watchlist = watchlist.filter((id) => id !== movieId);
        // Save updated watchlist
        await this.storage.set('watchlist', watchlist);
      }
    });
    this.isInWatchlist = false;
    console.log("removed from watchlist");
    console.log(this.isInWatchlist);
  }
  async addToSeen(movieId: number) {
    this.storage.get('seen').then(async (seen: number[]) => {
      if (!seen) {
        seen = [];
      }
      // Add the new movie ID if it's not already in the watchlist
      if (!seen.includes(movieId)) {
        seen.push(movieId);
        // Save updated watchlist
        await this.storage.set('seen', seen);
      }
    });
    this.removeFromWatchlist(movieId);
    this.isInSeen = true;
  }
  async removeFromSeen(movieId: number) {
    // Get existing watchlist
    this.storage.get('seen').then(async (seen: number[]) => {
      if (!seen) {
        seen = [];
      }
      // Remove the movie ID if it's in the watchlist
      if (seen.includes(movieId)) {
        seen = seen.filter((id) => id !== movieId);
        // Save updated watchlist
        await this.storage.set('seen', seen);
      }
    });
    this.isInSeen = false;
  }
  loadRecommendations(id: string) {
    this.movieService.getMovieRecommendation(id).subscribe((res) => {
      //push the elements of the response to the array one by one except for the elements who have a null poster_path
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].poster_path != null) {
          this.recommendedMovies.push(res.results[i]);
        }
      }
    });
  }
  loadCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe((res) => {
      //push the elements of the response to the array one by one except for the elements who have a null poster_path
      for (let i = 0; i < Math.min(res.cast.length, 10); i++) {
        if (res.cast[i].profile_path != null) {
          this.credits.push(res.cast[i]);
        }
      }
      console.log(res);
    });
  }
  transformMinute(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';
  }



}
