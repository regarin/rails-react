import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../../app/javascript/components/Home';

let mockIsLoading = false;
let mockData = [];

let mockFetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn(),
  })
);
global.fetch = mockFetch;


jest.mock('react-query', () => ({
  useQuery: () => ({ isLoading: mockIsLoading, data: mockData, refetch: jest.fn() }),
  useMutation: (fn) => ({ mutate: fn }),
}));

describe('Home', () => {
  describe('when tasks are loading', () => {
    beforeAll(() => {
      mockIsLoading = true;
      render(<Home />);
    });

    it('shows loading message', () => {
      const text = screen.getByText('Cargando...');
      expect(text).not.toBeNull();
    });
  });

  describe('when tasks are loaded', () => {
    beforeEach(() => {
      mockIsLoading = false;
      const mockTask = { id: 1, description: "Hola" };
      mockData = [mockTask];
      render(<Home />);
    });

    it('shows tasks', () => {
      const text = screen.getByText('Hola');
      expect(text).not.toBeNull();
    });

    it('allows removing a task', () => {
      const button = screen.getByText('x');
      fireEvent.click(button);
      expect(mockFetch).toHaveBeenCalledWith(`/api/v1/tasks/1`, { method: 'DELETE' });
    });
  });
});