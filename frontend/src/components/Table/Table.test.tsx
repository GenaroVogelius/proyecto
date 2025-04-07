import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import { expect, it, describe } from 'vitest';


describe('Table Component', () => {
  it('renders table with correct structure', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Test Cell</td>
          </tr>
        </tbody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass('w-[600px]', 'px-2');
  });

  it('renders children correctly', () => {
    const testContent = 'Test Content';
    render(
      <Table>
        <tbody>
          <tr>
            <td>{testContent}</td>
          </tr>
        </tbody>
      </Table>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('has correct column structure', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
          </tr>
        </tbody>
      </Table>
    );

    const colgroup = document.querySelector('colgroup');
    expect(colgroup).toBeInTheDocument();
    
    const cols = document.querySelectorAll('col');
    expect(cols).toHaveLength(2);
    cols.forEach(col => {
      expect(col).toHaveClass('w-1/2');
    });
  });

  it('renders multiple rows correctly', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
          </tr>
        </tbody>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2')).toBeInTheDocument();
  });
}); 