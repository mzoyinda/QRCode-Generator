import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import PhotoHeader from '../components/Home/PhotosHeader';
import { useAppSelector } from '../hooks/redux-hooks';

jest.mock('../hooks/redux-hooks', () => ({
  useAppSelector: jest.fn(),
}));

describe('PhotoHeader Component', () => {
  let setFilteredAlbum;

  beforeEach(() => {
    setFilteredAlbum = jest.fn();

    useAppSelector.mockImplementation((selector) =>
      selector({
        placeholders: {
          album: [
            { title: 'Photo 1', thumbnailUrl: 'url1' },
            { title: 'Photo 2', thumbnailUrl: 'url2' },
            { title: 'Another Photo', thumbnailUrl: 'url3' },
          ],
        },
      })
    );
  });

  test('renders without crashing', () => {
    renderWithProviders(<PhotoHeader setFilteredAlbum={setFilteredAlbum} />);
    expect(screen.getByText('Photo Album')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search photos...')).toBeInTheDocument();
  });

  test('updates query state on input change', () => {
    renderWithProviders(<PhotoHeader setFilteredAlbum={setFilteredAlbum} />);

    const searchInput = screen.getByPlaceholderText('Search photos...');
    fireEvent.change(searchInput, { target: { value: 'Photo 1' } });

    expect(searchInput.value).toBe('Photo 1');
  });

  test('filters album based on query', () => {
    renderWithProviders(<PhotoHeader setFilteredAlbum={setFilteredAlbum} />);

    const searchInput = screen.getByPlaceholderText('Search photos...');
    fireEvent.change(searchInput, { target: { value: 'Photo 1' } });

    expect(setFilteredAlbum).toHaveBeenCalledWith([
      { title: 'Photo 1', thumbnailUrl: 'url1' },
    ]);

    fireEvent.change(searchInput, { target: { value: 'Another' } });

    expect(setFilteredAlbum).toHaveBeenCalledWith([
      { title: 'Another Photo', thumbnailUrl: 'url3' },
    ]);

    fireEvent.change(searchInput, { target: { value: 'Photo' } });

    expect(setFilteredAlbum).toHaveBeenCalledWith([
      { title: 'Photo 1', thumbnailUrl: 'url1' },
      { title: 'Photo 2', thumbnailUrl: 'url2' },
      { title: 'Another Photo', thumbnailUrl: 'url3' },
    ]);
  });
});
