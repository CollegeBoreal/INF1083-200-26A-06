
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface Church {
  id: number;
  ownerId: number;
  name: string;
  username: string;
  pastor: string;
  country: string;
  city: string;
  address: string;
  description: string;
  logo: string;
  cover: string;
  followers: number[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  private storageKey = 'dailyfaith_churches';
  private churches: Church[] = [];
  private nextId = 1;

  constructor() {
    this.loadChurches();
  }

  private loadChurches() {

    const savedData = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.churches = data.churches;
        this.nextId = data.nextId;
      } catch (error) {
        console.error('Erreur de chargement des églises', error);
      }
    }
  }

  private saveChurches() {

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify({
        churches: this.churches,
        nextId: this.nextId
      })
    );
  }

  getChurches(): Church[] {
    return this.churches;
  }

  getChurchById(id: number): Church | undefined {
    return this.churches.find(church => church.id === id);
  }

  getPastorChurches(ownerId: number): Church[] {
    return this.churches.filter(
      church => church.ownerId === ownerId
    );
  }

  createChurch(
    ownerId: number,
    name: string,
    username: string,
    pastor: string,
    country: string,
    city: string,
    address: string,
    description: string
  ): Church | null {

    const normalizedUsername = username
      .trim()
      .toLowerCase()
      .replace(/^@/, '');

    if (
      !name.trim() ||
      !pastor.trim() ||
      !country.trim() ||
      !city.trim() ||
      !/^[a-z0-9_.]+$/.test(normalizedUsername)
    ) {
      return null;
    }

    if (this.churches.some(
      church => church.username === normalizedUsername
    )) {
      return null;
    }

    const church: Church = {
      id: this.nextId++,
      ownerId,
      name: name.trim(),
      username: normalizedUsername,
      pastor: pastor.trim(),
      country: country.trim(),
      city: city.trim(),
      address: address.trim(),
      description: description.trim(),
      logo: '',
      cover: '',
      followers: [],
      createdAt: new Date().toISOString()
    };

    this.churches.unshift(church);
    this.saveChurches();

    return church;
  }

  // Modifier le profil et les images
  updateChurch(
    churchId: number,
    ownerId: number,
    name: string,
    username: string,
    pastor: string,
    country: string,
    city: string,
    address: string,
    description: string,
    logo?: string,
    cover?: string
  ): boolean {

    const church = this.getChurchById(churchId);

    if (!church || church.ownerId !== ownerId) {
      return false;
    }

    const normalizedUsername = username
      .trim()
      .toLowerCase()
      .replace(/^@/, '');

    if (
      !name.trim() ||
      !pastor.trim() ||
      !country.trim() ||
      !city.trim() ||
      !/^[a-z0-9_.]+$/.test(normalizedUsername)
    ) {
      return false;
    }

    const exists = this.churches.some(
      item =>
        item.id !== churchId &&
        item.username === normalizedUsername
    );

    if (exists) {
      return false;
    }

    church.name = name.trim();
    church.username = normalizedUsername;
    church.pastor = pastor.trim();
    church.country = country.trim();
    church.city = city.trim();
    church.address = address.trim();
    church.description = description.trim();

    // Enregistrer les images
    if (logo !== undefined) {
      church.logo = logo;
    }

    if (cover !== undefined) {
      church.cover = cover;
    }

    this.saveChurches();

    return true;
  }

  searchChurches(query: string): Church[] {

    const search = query.trim().toLowerCase();

    return this.churches.filter(church =>
      church.name.toLowerCase().includes(search) ||
      church.username.toLowerCase().includes(
        search.replace(/^@/, '')
      ) ||
      church.pastor.toLowerCase().includes(search) ||
      church.city.toLowerCase().includes(search) ||
      church.country.toLowerCase().includes(search)
    );
  }

  followChurch(churchId: number, userId: number) {

    const church = this.getChurchById(churchId);

    if (church && !church.followers.includes(userId)) {
      church.followers.push(userId);
      this.saveChurches();
    }
  }

  unfollowChurch(churchId: number, userId: number) {

    const church = this.getChurchById(churchId);

    if (church) {

      church.followers = church.followers.filter(
        id => id !== userId
      );

      this.saveChurches();
    }
  }

  isFollowing(
    churchId: number,
    userId: number
  ): boolean {

    const church = this.getChurchById(churchId);

    return church?.followers.includes(userId) ?? false;
  }

  getFollowersCount(churchId: number): number {

    const church = this.getChurchById(churchId);

    return church?.followers.length ?? 0;
  }

  getFollowedChurches(userId: number): Church[] {

    return this.churches.filter(
      church => church.followers.includes(userId)
    );
  }
}
