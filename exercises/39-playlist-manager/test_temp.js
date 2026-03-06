/**
 * Pruebas para Playlist Manager
 * Ejecutar con: npm test exercises/39-playlist-manager
 */

const { Song, Playlist } = require('./solution.js');

describe('Playlist Manager', () => {
  describe('Song - creación y propiedades', () => {
    test('debe crear una canción con todas sus propiedades', () => {
      const song = new Song('Bohemian Rhapsody', 'Queen', 354, 72, 'rock');
      expect(song.title).toBe('Bohemian Rhapsody');
      expect(song.artist).toBe('Queen');
      expect(song.duration).toBe(354);
      expect(song.bpm).toBe(72);
      expect(song.genre).toBe('rock');
    });

    test('debe formatear la duración en mm:ss correctamente', () => {
      const song = new Song('Short', 'Artist', 90, 120, 'pop');
      expect(song.formatDuration()).toBe('1:30');
    });

    test('debe formatear duraciones menores a 10 segundos con cero', () => {
      const song = new Song('Short', 'Artist', 65, 120, 'pop');
      expect(song.formatDuration()).toBe('1:05');
    });
  });

  describe('Playlist - agregar y remover canciones', () => {
    let playlist;
    beforeEach(() => {
      playlist = new Playlist('My Mix');
    });

    test('debe agregar canciones correctamente', () => {
      const song = new Song('Song A', 'Artist A', 200, 100, 'pop');
      playlist.addSong(song);
      expect(playlist.songs.length).toBe(1);
    });

    test('no debe agregar la misma canción dos veces (deduplicación por título+artista)', () => {
      const song1 = new Song('Song A', 'Artist A', 200, 100, 'pop');
      const song2 = new Song('Song A', 'Artist A', 200, 100, 'pop');
      playlist.addSong(song1);
      playlist.addSong(song2);
      expect(playlist.songs.length).toBe(1);
    });

    test('debe remover una canción por título', () => {
      const song = new Song('Song A', 'Artist A', 200, 100, 'pop');
      playlist.addSong(song);
      playlist.removeSong('Song A');
      expect(playlist.songs.length).toBe(0);
    });

    test('debe lanzar error al remover canción inexistente', () => {
      expect(() => playlist.removeSong('Nonexistent')).toThrow();
    });
  });

  describe('Playlist - duración total', () => {
    test('debe calcular la duración total correctamente', () => {
      const playlist = new Playlist('Test');
      playlist.addSong(new Song('A', 'X', 180, 100, 'pop'));
      playlist.addSong(new Song('B', 'Y', 240, 110, 'rock'));
      playlist.addSong(new Song('C', 'Z', 90, 90, 'jazz'));
      expect(playlist.getTotalDuration()).toBe(510);
    });

    test('debe retornar 0 para playlist vacía', () => {
      const playlist = new Playlist('Empty');
      expect(playlist.getTotalDuration()).toBe(0);
    });
  });

  describe('Playlist - ordenar canciones', () => {
    let playlist;
    beforeEach(() => {
      playlist = new Playlist('Sort Test');
      playlist.addSong(new Song('C Song', 'Z', 300, 80, 'rock'));
      playlist.addSong(new Song('A Song', 'X', 120, 140, 'pop'));
      playlist.addSong(new Song('B Song', 'Y', 200, 110, 'jazz'));
    });

    test('debe ordenar canciones por duración ascendente (numérico)', () => {
      const sorted = playlist.sortBy('duration');
      expect(sorted[0].duration).toBe(120);
      expect(sorted[1].duration).toBe(200);
      expect(sorted[2].duration).toBe(300);
    });

    test('debe ordenar canciones por BPM ascendente (numérico)', () => {
      const sorted = playlist.sortBy('bpm');
      expect(sorted[0].bpm).toBe(80);
      expect(sorted[1].bpm).toBe(110);
      expect(sorted[2].bpm).toBe(140);
    });

    test('debe ordenar canciones por título alfabéticamente', () => {
      const sorted = playlist.sortBy('title');
      expect(sorted[0].title).toBe('A Song');
      expect(sorted[1].title).toBe('B Song');
      expect(sorted[2].title).toBe('C Song');
    });
  });

  describe('Playlist - filtrar por género', () => {
    test('debe retornar solo canciones del género solicitado', () => {
      const playlist = new Playlist('Genre Test');
      playlist.addSong(new Song('A', 'X', 180, 100, 'pop'));
      playlist.addSong(new Song('B', 'Y', 200, 110, 'rock'));
      playlist.addSong(new Song('C', 'Z', 160, 90, 'pop'));
      const popSongs = playlist.filterByGenre('pop');
      expect(popSongs.length).toBe(2);
      expect(popSongs.every(s => s.genre === 'pop')).toBe(true);
    });
  });

  describe('Playlist - estadísticas', () => {
    test('debe calcular el BPM promedio correctamente', () => {
      const playlist = new Playlist('Stats');
      playlist.addSong(new Song('A', 'X', 180, 100, 'pop'));
      playlist.addSong(new Song('B', 'Y', 200, 120, 'rock'));
      playlist.addSong(new Song('C', 'Z', 160, 80, 'jazz'));
      expect(playlist.getAverageBpm()).toBe(100);
    });

    test('debe retornar los top N artistas por cantidad de canciones', () => {
      const playlist = new Playlist('Artists');
      playlist.addSong(new Song('A1', 'Queen', 200, 100, 'rock'));
      playlist.addSong(new Song('A2', 'Queen', 210, 105, 'rock'));
      playlist.addSong(new Song('B1', 'Beatles', 190, 95, 'pop'));
      playlist.addSong(new Song('C1', 'Bowie', 220, 110, 'rock'));
      const top = playlist.getTopArtists(2);
      expect(top[0].artist).toBe('Queen');
      expect(top[0].count).toBe(2);
      expect(top.length).toBe(2);
    });

    test('debe detectar géneros únicos de la playlist', () => {
      const playlist = new Playlist('Genres');
      playlist.addSong(new Song('A', 'X', 180, 100, 'pop'));
      playlist.addSong(new Song('B', 'Y', 200, 110, 'rock'));
      playlist.addSong(new Song('C', 'Z', 160, 90, 'pop'));
      const genres = playlist.getUniqueGenres();
      expect(genres.sort()).toEqual(['pop', 'rock']);
    });
  });

  describe('Playlist - merge', () => {
    test('debe fusionar dos playlists sin duplicados', () => {
      const p1 = new Playlist('P1');
      const p2 = new Playlist('P2');
      p1.addSong(new Song('Song A', 'Artist A', 200, 100, 'pop'));
      p2.addSong(new Song('Song A', 'Artist A', 200, 100, 'pop'));
      p2.addSong(new Song('Song B', 'Artist B', 210, 105, 'rock'));
      const merged = p1.merge(p2);
      expect(merged.songs.length).toBe(2);
    });
  });
});
