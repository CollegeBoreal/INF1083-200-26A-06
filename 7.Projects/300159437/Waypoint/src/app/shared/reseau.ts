import { Connectivity } from '@nativescript/core';

/** Waypoint fonctionne en ligne : vérifie qu'il y a Internet (Wi-Fi, données mobiles…). */
export function enLigne(): boolean {
  return Connectivity.getConnectionType() !== Connectivity.connectionType.none;
}
