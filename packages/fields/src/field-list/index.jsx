import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import pick from 'lodash/fp/pick';
import asyncHOC from './asyncHOC.js';
import FieldList from './FieldList.jsx';

export default function createFieldList(locationDB) {
	const ConnectedFieldList = asyncHOC(
		() => locationDB.allDocs({
			include_docs: true,
			startkey: 'fields/',
			endkey: 'fields/',
		}).then(res => res.rows(pick('_id', 'name', 'geometry', 'crop'))),
		{ dataProp: 'rows', dataDefault: [] },
	)(FieldList);

	render(<ConnectedFieldList />, document.getElementById('reactRoot'));
}
