import { createElement, PureComponent, MouseEvent } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { centsToString } from '@ubc-farm/money';

import PriceField from './PriceField';
import DeleteButton from './DeleteButton';

interface SaleRowProps {
	sale: Sale,
	index: number,
	onDelete(index: number, e: MouseEvent<HTMLButtonElement>): void,
	onClick(index: number, e: MouseEvent<HTMLTableRowElement>): void,
}

export default class SaleRow extends PureComponent<SaleRowProps, void> {
	handleClick: (e: MouseEvent<HTMLTableRowElement>) => void
	handleDelete: (e: MouseEvent<HTMLButtonElement>) => void

	constructor(props: SaleRowProps) {
		super(props);

		this.handleClick = props.onClick.bind(this, props.index);
		this.handleDelete = props.onDelete.bind(this, props.index);
	}

	render() {
		const { handleClick, handleDelete, props: { sale } } = this;

		return (
			<tr className="invoice-row" onClick={handleClick}>
				<td className="item-col">{sale.item}</td>
				<td className="description-col">{sale.description}</td>
				<td className="unit-cost-col">
					{sale.unitCost ? centsToString(sale.unitCost) : ''}
				</td>
				<td className="quantity-col">{sale.quantity}</td>

				<PriceField sale={sale} />
				<DeleteButton onDelete={handleDelete} />
			</tr>
		);
	}
}
