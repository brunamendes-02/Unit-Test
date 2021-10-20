import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from '.'

describe('Counter component', () => {
    // ----------------------------------------------------------------- //
    test('Deve iniciar com o valor 0', () => {
        render(<Counter />);
        const counterTitle = screen.getByText('0'); // tenta encontrar o texto e retorna o elemento, caso n encontre já lança erro
        // const counterTitle = screen.queryByText('0'); // tenta encontrar o texto e retorna o elemento, caso n encontre retorna null
        // const counterTitle = screen.findByText('0'); // retorna uma promisse
        
        expect(counterTitle).toBeInTheDocument(); // verifica se existe no documento
    });

    // ----------------------------------------------------------------- //
    test('Deve conter a classe counter__title no titulo', () => {
        render(<Counter />);
        const counterTitle = screen.getByText('0');

        expect(counterTitle).toHaveClass('counter__title'); // verifica se existe a classe
    });

    // ----------------------------------------------------------------- //
    test('Não deve iniciar o titulo com as classes counter__title--increment e counter__title--decrement', () => {
        render(<Counter />);
        const counterTitle = screen.getByText('0');

        expect(counterTitle).not.toHaveClass('counter__title--increment');
        expect(counterTitle).not.toHaveClass('counter__title--decrement'); // verifica se não existe a classe
    });

    // ----------------------------------------------------------------- //
    test('Deve conter um botão incrementar', () => {
        render(<Counter />);
        // const counterButton = screen.getByRole('button'); // neste caso estoura um erro pois ele encontra 2 botões, não só um
        const buttonIncrement = screen.getByRole('button', {name: /incrementar/i}); // pega o botão com o titulo x
        expect(buttonIncrement).toBeInTheDocument();
    });

    // ----------------------------------------------------------------- //
    test('Botão incrementar deve conter classes button e button--increment', () => {
        render(<Counter />);
        
        const buttonIncrement = screen.getByRole('button', {name: /incrementar/i});
        expect(buttonIncrement).toHaveClass('button');
        expect(buttonIncrement).toHaveClass('button--increment');
    });

    // ----------------------------------------------------------------- //
    test('Botão deve incrementar +1 ao clicar no botão incrementar', () => {
        render(<Counter />);
        
        const buttonIncrement = screen.getByRole('button', {name: /incrementar/i});

        expect(screen.queryByText('1')).toBeNull();
        userEvent.click(buttonIncrement);
        expect(screen.getByText('1')).toBeInTheDocument();

    });

    // ----------------------------------------------------------------- //
    test('Deve adicionar a classe counter__title--increment no titulo quando valor > 0', () => {
        render(<Counter />);
        
        const buttonIncrement = screen.getByRole('button', {name: /incrementar/i});

        expect(screen.queryByText('0')).not.toHaveClass('counter__title--increment');
        userEvent.click(buttonIncrement);
        expect(screen.getByText('1')).toHaveClass('counter__title--increment')

    });
})