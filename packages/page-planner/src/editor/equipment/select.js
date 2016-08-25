import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { setSelectedEquipment } from '../../redux/actions/index.js';
import { equipmentList, selectedEquipment } from '../../redux/selectors.js';

const EquipmentSelector = ({ value = '', onChange, options }) => (
	<select value={value} onChange={onChange} className="equip-choose">
		<option value="" disabled />
		{Array.from(options, ([id, { name }]) => (
			<option value={id} key={id}>{name}</option>
		))}
	</select>
);

EquipmentSelector.propTypes = {
	options: PropTypes.instanceOf(Map),
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default connect(
	(state, { position }) => {
		const [equipmentID] = selectedEquipment(state)[position];
		return {
			options: equipmentList(state),
			value: equipmentID,
		};
	},
	(dispatch, { position }) => ({
		onChange({ target }) {
			setSelectedEquipment(position, target.value, undefined);
		},
	})
)(EquipmentSelector);
