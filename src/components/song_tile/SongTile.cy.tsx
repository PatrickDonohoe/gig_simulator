import { MemoryRouter } from "react-router";

import SongTile from "@/components/song_tile/SongTile";
import type { SongType } from "@/types/SongType";

const songData: SongType = {
  id: 'a1',
  rbid: 'rba1',
  title: 'Song A',
  artists: 'A, B, C',
  key: 'D',
  mode: 'minor',
  tempo: 128,
  duration: 220,
  instrumentation: ['guitar', 'piano', 'vocals'],
  upc: 'upcandstuff',
}

describe('<SongTile>', () => {
  it('mounts and displays the song title', () => {
    cy.mount(
      <MemoryRouter>
        <SongTile song={songData} />
      </MemoryRouter>
    )

    cy.get('#song-title').should('include.text', 'Song A')
    cy.get('#artists').should('include.text', 'A, B, C');
    cy.get('#key').should('include.text', 'D minor');
    cy.get('#tempo').should('include.text', '128 bpm');
    cy.get('#duration').should('include.text', '3:40');
  });
});