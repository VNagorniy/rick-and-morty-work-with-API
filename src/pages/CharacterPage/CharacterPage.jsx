import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './CharacterPage.module.css';

export const CharacterPage = () => {
	const [characters, setCharacters] = useState([]);

	const [info, setInfo] = useState({
		count: 0,
		pages: 0,
		prev: null,
		next: null
	});

	const [error, setError] = useState(null);

	const fetchData = (url) => {
		axios
			.get(url)
			.then((res) => {
				setCharacters(res.data.results);
				setInfo(res.data.info);
				setError(null);
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

	useEffect(() => {
		fetchData('https://rickandmortyapi.com/api/character');
	}, []);

	const previousPageHandler = () => {
		fetchData(info.prev);
	};

	const nextPageHandler = () => {
		fetchData(info.next);
	};

	const searchHeadler = (event) => {
		const value = event.currentTarget.value;
		fetchData(`https://rickandmortyapi.com/api/character?name=${value}`);
	};

	return (
		<div className={'pageContainer'}>
			<h1 className={'pageTitle'}>CharacterPage</h1>
			<input type="search" className={s.search} onChange={searchHeadler} placeholder="Search..." />
			{error && <div className="errorMessage">{error}</div>}
			{!error && characters.length && (
				<>
					{
						<div className={s.characters}>
							{characters.map((character) => {
								return (
									<div key={character.id} className={s.character}>
										<div className={s.characterLink}>{character.name}</div>
										<img src={character.image} alt={`${character.name} avatar`} />
									</div>
								);
							})}
						</div>
					}
					<div className={s.buttonContainer}>
						<button className="linkButton" disabled={info.prev === null} onClick={previousPageHandler}>
							Назад
						</button>
						<button className="linkButton" disabled={info.next === null} onClick={nextPageHandler}>
							Вперед
						</button>
					</div>
				</>
			)}
		</div>
	);
};
