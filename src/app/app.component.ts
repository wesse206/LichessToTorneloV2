import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LichessService } from './lichess.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LichessToTornelo';
  value = 'oWRoSSjX'

  GetPGN() {
    this.lichess.getPGN(this.value).subscribe(data => {
      this.ConvertToTornelo(data)
      }
    )
  }

  ConvertToTornelo(rawPGN: string) {
    let pgn = rawPGN.split('\n')
    let round = 0
    let game = 1
    let currentTime = ''
    for (let i = 0; i < pgn.length; i++) {
      if (pgn[i].includes('White')) {
        pgn[i] = pgn[i].replace('White "', 'White, "L, ')
      }
      else if (pgn[i].includes('Black')) {
        pgn[i] = pgn[i].replace('Black "', 'Black, "L, ')
      }
      
      if (pgn[i].includes('UTCTime')) {
        if (currentTime !== pgn[i]) {
          currentTime = pgn[i]
          round++
          game = 1
        }
        pgn.splice(i + 1, 0, `[Round "${round}.${game}"]`)
        game++
      }

      console.log(pgn[i])
    }

    let pgnBlob = new Blob([pgn.join('\n')], { type: 'text/plain' })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(pgnBlob)
    link.download = this.value + '.pgn'
    link.click()
    
  }

  constructor(private lichess: LichessService) {
  }
}
