import { Table } from '@chakra-ui/react';

interface Column<T> {
  label: string;
  key: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const DataTable = <T extends { id: string | number }>({
  columns,
  data,
}: DataTableProps<T>) => {
  return (
    <Table.Root size='sm'>
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader key={String(col.key)}>
              {col.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((col) => (
              <Table.Cell key={String(col.key)}>
                {item[col.key] as React.ReactNode}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
