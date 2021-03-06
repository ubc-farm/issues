import * as PouchDB from 'pouchdb';

export type HeaderRowRendererParams = {
	className: string,
	columns: React.ReactNode[],
	style: React.CSSProperties,
	scrollbarWidth: number,
	height: number,
	width: number
};
export type RowRendererParams = {
	className: string,
	columns: Array<any>,
	index: number,
	isScrolling: boolean,
	onRowClick?: Function,
	onRowDoubleClick?: Function,
	onRowMouseOver?: Function,
	onRowMouseOut?: Function,
	rowData: any,
	style: any
};
export type IndexParam = { index: number };
export type IDParam = { id: string };
export type InfoParam = IndexParam & IDParam;
export type TableRowRenderer = (params: RowRendererParams) => React.ReactNode;
export type TableHeaderRowRenderer = (params: HeaderRowRendererParams) => React.ReactNode;
export type SortDirectionType = 'ASC' | 'DESC';

export interface AutoSizedPouchTableProps {
	db: PouchDB.Database<any>;
	startkey?: string;
	endkey?: string;
	keys?: string[];

	autoHeight?: boolean;
  children?: React.ReactChildren;
  className?: string;
  disableHeader?: boolean;
  estimatedRowSize?: number;
  gridClassName?: string;
  gridStyle?: any;
  headerClassName?: string;
  headerHeight: number;
  headerStyle?: any;
  id?: string;
  noRowsRender?: () => void;
  onHeaderClick?: (dataKey: string, columnData: any) => void;
  onRowClick?: (info: InfoParam) => void;
  onRowDoubleClick?: (info: InfoParam) => void;
  onRowMouseOut?: (info: InfoParam) => void;
  onRowMouseOver?: (info: InfoParam) => void;
  overscanRowCount?: number;
  onScroll?: (info: { clientHeight: number, scrollHeight: number, scrollTop: number }) => void;
  rowClassName?: string | ((info: InfoParam) => string);
  rowHeight: number | ((info: InfoParam) => number);
  rowRenderer?: TableRowRenderer;
  headerRowRenderer?: TableHeaderRowRenderer;
  rowStyle?: React.CSSProperties | ((info: InfoParam) => React.CSSProperties);
  scrollToAlignment?: string;
  scrollToIndex?: number;
  scrollTop?: number;
  sort?: (info: { sortBy: string, sortDirection: SortDirectionType }) => void;
  sortBy?: string;
  sortDirection?: SortDirectionType;
  style?: React.CSSProperties;
  tabIndex?: number;
}

export interface PouchTableProps extends AutoSizedPouchTableProps {
	height: number;
	width: number;
}

export const PouchTable: React.ComponentClass<PouchTableProps>;
export const AutoSizedTable: React.SFC<AutoSizedPouchTableProps>;
export { Column } from 'react-virtualized';
