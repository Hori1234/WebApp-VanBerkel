import React from 'react';
import Home from './Home';
import { mount, shallow, render, setProps } from 'enzyme';
import {
    MemoryRouter
} from 'react-router'
import { Route } from 'react-router-dom';


describe('Home Component', () => {

    const component = shallow(<Home />);

    it('should render the login page correctly', () => {

        expect(component).toMatchSnapshot();
    });

    it('should route to the correct page', () => {


        const component = mount(
            <MemoryRouter initialentries="{['/']}">
                <Home />
            </MemoryRouter>
        );
        const button = document.getElementById('button');

        expect(button).toHaveLength(1);

    });


});