import axios from 'axios';
import { useEffect, useState } from 'react';

export const EpisodePage = () => {
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		axios.get('https://rickandmortyapi.com/api/episode').then((res) => {
			setEpisodes(res.data.results);
		});
	}, []);

	return (
		<div className={'pageContainer'}>
			<h1 className={`pageTitle`}>EpisodePage</h1>
			<div>
				{episodes.map((episode) => {
					return (
						<div key={episode.id}>
							<ul>
								<li>
									Эпизод: <b>{episode.episode}</b>
								</li>
								<li>
									Название эпизода: <b>{episode.name}</b>
								</li>
								<li>
									Дата выхода эпизода в эфир: <b>{episode.air_date}</b>
								</li>
								<li>
									Список персонажей, которые были замечены в эпизоде: <b>{episode.characters.length}</b>
								</li>
							</ul>
							<hr />
						</div>
					);
				})}
			</div>
		</div>
	);
};
