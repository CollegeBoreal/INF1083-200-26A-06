import { Component, OnInit } from '@angular/core'

@Component({
    standalone: false,
    selector: 'Browse',
    templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {

    exercices = [
        {
            nom: 'Développé couché',
            muscle: 'Pectoraux',
            series: 4,
            repetitions: 10,
            icone: '🏋️'
        },
        {
            nom: 'Squat',
            muscle: 'Jambes',
            series: 4,
            repetitions: 12,
            icone: '🦵'
        },
        {
            nom: 'Curl biceps',
            muscle: 'Biceps',
            series: 3,
            repetitions: 12,
            icone: '💪'
        },
        {
            nom: 'Tirage vertical',
            muscle: 'Dos',
            series: 4,
            repetitions: 10,
            icone: '🏋️'
        },
        {
            nom: 'Développé militaire',
            muscle: 'Épaules',
            series: 3,
            repetitions: 10,
            icone: '💪'
        },
        {
            nom: 'Gainage',
            muscle: 'Abdominaux',
            series: 3,
            repetitions: 1,
            icone: '🔥'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}