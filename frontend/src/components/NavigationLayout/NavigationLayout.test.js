import React, { useContext } from 'react';
import { mount, shallow, render, setProps } from 'enzyme';
import {
    MemoryRouter
} from 'react-router'
import { Route, Link, useLocation } from 'react-router-dom';
import { Layout, Image, Typography, Button, Divider } from 'antd';
import AuthContext from '../contextConfig';
import NavigationLayout from './NavigationLayout';




describe('NAvigationLayout component', () => {


    it('should render the login page correctly', () => {

        const component = shallow(<NavigationLayout />);
        expect(component).toMatchSnapshot();
    });

    it('should have the correct view button href', () => {
        const user = { state: { username: 'test', role: 'Administrator' } };

        const component = render(<AuthContext.Provider value={user} >
            <NavigationLayout />
        </AuthContext.Provider>
        );
        const viewButton = component.find('#viewButton > a')[0];

        expect(viewButton.attribs.href).toEqual('/view');

    });

    it('should have the correct planningButton href', () => {
        const user = { state: { username: 'test', role: 'Administrator' } };

        const component = render(<AuthContext.Provider value={user} >
            <NavigationLayout />
        </AuthContext.Provider>
        );

        const dataButton = component.find('#dataButton > a')[0];

        expect(dataButton.attribs.href).toEqual('/data');

    });

    it('should have the correct planningButton href', () => {
        const user = { state: { username: 'test', role: 'Administrator' } };

        const component = render(<AuthContext.Provider value={user} >
            <NavigationLayout />
        </AuthContext.Provider>
        );

        const monthlyButton = component.find('#monthlyButton > a')[0];

        expect(monthlyButton.attribs.href).toEqual('/montly');

    });

    it('should have the correct uploadButton href', () => {
        const user = { state: { username: 'test', role: 'Administrator' } };

        const component = render(<AuthContext.Provider value={user} >
            <NavigationLayout />
        </AuthContext.Provider>
        );

        const uploadButton = component.find('#uploadButton > a')[0];

        expect(uploadButton.attribs.href).toEqual('/upload');

    });



});