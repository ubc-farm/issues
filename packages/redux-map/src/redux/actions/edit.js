import { selectedTask } from '../selectors.js';
import {
	setTaskLocation,
	deleteTaskEquipment,
} from './task.js';

export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';

export function setSelected(id, meta) {
	return { type: SET_SELECTED_TASK, payload: id, meta };
}

export function setSelectedLocation(location) {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(setTaskLocation(selected, location));
	};
}

export function deleteSelectedEquipment(equipment) {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(deleteTaskEquipment(selected, equipment));
	};
}
