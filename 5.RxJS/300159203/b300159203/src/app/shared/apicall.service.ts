import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Song } from './song';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    selectedSong: Song;

    constructor(private httpClient: HttpClient) {}

    searchSongByName(term: string): Observable<Song[]> {
        return this.httpClient
            .get<any>(
                'https://itunes.apple.com/search?entity=song&limit=20&term=' +
                encodeURIComponent(term)
            )
            .pipe(
                map((data: any) => data.results.map((s: any) => ({
                    id: s.trackId,
                    title: s.trackName,
                    artist: s.artistName,
                    album: s.collectionName,
                    artwork: s.artworkUrl100
                } as Song))),
                catchError(error => {
                    return throwError(
                        () => 'Song not found!'
                    );
                })
            );
    }

    getLyrics(artist: string, title: string): Observable<string> {
        const cleanTitle = title.replace(/\(.*?\)|\[.*?\]/g, '').trim();
        const url =
            'https://lrclib.net/api/search?track_name=' +
            encodeURIComponent(cleanTitle) +
            '&artist_name=' + encodeURIComponent(artist);

        return this.httpClient
            .get<any[]>(url)
            .pipe(
                timeout(10000),
                map((results: any[]) => {
                    const hit = results.find(r => r.plainLyrics);
                    if (!hit) {
                        throw new Error('no lyrics');
                    }
                    return hit.plainLyrics as string;
                }),
                catchError(error => {
                    console.log('LYRICS ERROR', error);
                    return throwError(
                        () => 'Paroles introuvables'
                    );
                })
            );
    }

    getFavorites(): Song[] {
        try {
            return JSON.parse(ApplicationSettings.getString('favorites', '[]'));
        } catch (e) {
            return [];
        }
    }

    isFavorite(song: Song): boolean {
        return this.getFavorites().some(s => s.id === song.id);
    }

    toggleFavorite(song: Song): boolean {
        let favs = this.getFavorites();
        const exists = favs.some(s => s.id === song.id);
        favs = exists ? favs.filter(s => s.id !== song.id) : [song, ...favs];
        ApplicationSettings.setString('favorites', JSON.stringify(favs));
        return !exists;
    }
}