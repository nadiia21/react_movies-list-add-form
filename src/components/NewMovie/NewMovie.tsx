import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (el: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [errorImg, setErrorImg] = useState(true);
  const [errorImdb, setErrorImdb] = useState(true);
  const pattern =
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reset = '';

    setTitle(reset);
    setDescription(reset);
    setImgUrl(reset);
    setImdbUrl(reset);
    setImdbId(reset);
    setCount(prev => prev + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={el => {
          setTitle(el);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={el => setDescription(el)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={el => {
          setImgUrl(el);
          setErrorImg(pattern.test(el));
        }}
        error={errorImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={el => {
          setImdbUrl(el);
          setErrorImdb(pattern.test(el));
        }}
        error={errorImdb}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={el => setImdbId(el)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imdbId.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !errorImg ||
              !errorImdb
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
