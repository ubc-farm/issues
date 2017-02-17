import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { isAnySelected } from '../reducer/selected.js';
import { getModel, setEditorProp } from '../reducer/editor.js';
import createEditor from './Editor.jsx';

export default function connectEditor(store, equipmentDB, locationsDB, tasksDB) {
	let Editor = createEditor(equipmentDB, locationsDB);
	Editor = connect(
		state => ({
			disabled: isAnySelected(state),
			model: getModel(state),
		}),
		dispatch => ({
			onSubmit: model => tasksDB.put(model),
			setProperty: (key, value) => dispatch(setEditorProp(key, value)),
		}),
	)(Editor);

	render(<Editor store={store} />, document.getElementById('reactRoot'));
}
