import React from 'react';
import { render } from 'enzyme';
import { AuthContext } from '../contextConfig';
import NavigationLayout from './NavigationLayout';


const ProvideUser = ({children}) => {
    const user = {
        state: {
            user: {
                id: 1,
                username: 'test',
                role: 'administrator'
            }
        }
    };
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};


describe('NavigationLayout component', () => {


    it('should render the login page correctly', () => {

        const component = render(
            <ProvideUser>
                <NavigationLayout />
            </ProvideUser>
        );
        expect(component).toMatchSnapshot();
    });

    it('should have the correct view button href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const viewButton = component.find('#viewButton > a')[0];
        expect(viewButton.attribs.href).toEqual('/view');

    });

    it('should have the correct dataButton href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const dataButton = component.find('#dataButton > a')[0];
        expect(dataButton.attribs.href).toEqual('/data');

    });

    it('should have the correct monthlyButton href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const monthlyButton = component.find('#monthlyButton > a')[0];
        expect(monthlyButton.attribs.href).toEqual('/montly');

    });

    it('should have the correct uploadButton href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const uploadButton = component.find('#uploadButton > a')[0];
        expect(uploadButton.attribs.href).toEqual('/upload');

    });

    it('should have the correct planningButton href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const planningButton = component.find('#planningButton > a')[0];
        expect(planningButton.attribs.href).toEqual('/planning');

    });

    it('should have the correct accountButton href', () => {
        const component = render(
            <ProvideUser>
                <NavigationLayout/>
            </ProvideUser>
        );
        const accountButton = component.find('#accountButton > a')[0];
        expect(accountButton.attribs.href).toEqual('/account');
    });
});