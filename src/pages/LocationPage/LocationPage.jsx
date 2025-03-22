import axios from 'axios';
import { useEffect, useState } from 'react';

export const LocationPage = () => {
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		axios.get('https://rickandmortyapi.com/api/location').then((res) => {
			console.log(res);
			setLocations(res.data.results);
		});
	}, []);

	return (
		<div className={`pageContainer`}>
			<h1 className={`pageTitle`}>LocationPage</h1>
			<div>
				{locations.map((location) => {
					return (
						<div key={location.id}>
							<ul>
								<li>
									Название локации: <b>{location.name}</b>
								</li>
								<li>
									Тип локации: <b>{location.type}</b>
								</li>
								<li>
									Измерение, в котором находится местоположение: <b>{location.dimension}</b>
								</li>
								<li>
									Количество персонажей, которых видели в данной локации: <b>{location.residents.length}</b>
								</li>
							</ul>
							<hr></hr>
						</div>
					);
				})}
			</div>
		</div>
	);
};
