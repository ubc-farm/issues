import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, Employee, Researcher } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import nestedReformed, { ReformedProps } from './nestedReformed';
import PersonForm from './PersonForm';
import EmployeeForm from './EmployeeForm';
import ResearcherForm from './ResearcherForm';

type ContactFormProps = { handleSubmit: React.FormEventHandler<any> }
	& ReformedProps<Person | Employee | Researcher>;

const ExtraFields: SFC<ContactFormProps> = (props) => {
	switch (props.model.role) {
		case 'employee':
			return <EmployeeForm {...props as ReformedProps<Employee>} />;
		case 'researcher':
			return <ResearcherForm {...props as ReformedProps<Researcher>} />;
		default:
			return null;
	}
}

const ContactForm: SFC<ContactFormProps> = (props) => {
	const { bindInput, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<datalist id="roles">
				<option value="employee" />
				<option value="researcher" />
			</datalist>
			<Field type="text" list="roles" {...bindInput<string>('role')}>
				Role
			</Field>
			<PersonForm {...props} />
			<ExtraFields {...props} />
		</form>
	);
}

export default nestedReformed(ContactForm);
