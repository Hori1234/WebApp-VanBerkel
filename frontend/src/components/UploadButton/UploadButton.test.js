import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Upload, { Layout } from 'antd';
import UploadButton from './UploadButton';
import { Dragger, message } from 'antd';

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

describe('UploadButton component', () => {

    it('should render the upload page correctly', () => {

        const component = mount(<UploadButton />);
        //console.log(component.debug());
        expect(component).toMatchSnapshot();
        component.unmount();
    });

    it('should have white background', () => {

        const button = jest.fn();
        const wrapper = mount(<UploadButton >
        </UploadButton>);
        wrapper.find('#dragger').at(0).simulate('click');

        expect(wrapper.find('#dragger').at(0)).toBeCalledWith(expect.anything());
        console.log(wrapper.debug());


    });

    // it('should have correct path on property action', () => {
    //     const info = { name: 'done' };

    //     const wrapper = shallow(<UploadButton>
    //     </UploadButton>);


    //     expect(wrapper.find('#dragger').props().action).toEqual('/api/sheets/');


    // });


});
