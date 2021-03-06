import { createElement, PropTypes, SFC, MouseEventHandler } from 'react';
/** @jsx createElement */

interface FieldEditorToolbarProps {
	onSubmit: () => void;
	onCancel: MouseEventHandler<any>;
	canSubmit?: boolean;
}

/**
 * A small toolbar to save or cancel changes to the field object in the database
 */
const FieldEditorToolbar: SFC<FieldEditorToolbarProps> = ({ onSubmit, onCancel, canSubmit }) => (
	<div>
		<button onClick={onCancel}>Cancel</button>
		<button onClick={onSubmit} disabled={!canSubmit}>Save</button>
	</div>
);

FieldEditorToolbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	canSubmit: PropTypes.bool,
};

FieldEditorToolbar.defaultProps = {
	canSubmit: true,
};

export default FieldEditorToolbar;
