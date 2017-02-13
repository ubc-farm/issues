import { omit } from 'lodash';

export function defaultToFeature(doc) {
	return {
		type: 'Feature',
		geometry: doc.geometry,
		id: doc._id,
		properties: omit('_id', 'geometry'),
	};
}

/**
 * Observes a PouchDB database and adds any new documents to the Google Map
 * data layer, or deleted them if removed.
 * @param {PouchDB} db
 * @param {google.maps.Data} mapDataLayer
 * @param {function} options.toFeature (Object) => GeoJSON.Feature
 * @returns {Promise<EventEmitter>} returns changes emitter.
 */
export default async function observeDatabase(
	db,
	mapDataLayer,
	{
		toFeature = defaultToFeature,
		allDocsOptions = { include_docs: true },
		changeOptions = { include_docs: true, live: true },
	} = {},
) {
	const { rows } = await db.allDocs(allDocsOptions);

	mapDataLayer.addGeoJson({
		type: 'FeatureCollection',
		features: rows.map(row => toFeature(row.doc)).filter(geo => geo != null),
	});

	return db.changes(
		Object.assign({}, changeOptions, { since: 'now' })
	).on('change', ({ id, deleted, doc }) => {
		if (deleted) {
			const feature = mapDataLayer.getFeatureById(id);
			if (feature != null) mapDataLayer.remove(feature);
		} else {
			mapDataLayer.addGeoJson(toFeature(doc));
		}
	});
}
