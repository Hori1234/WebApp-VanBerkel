import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Upload, { Layout } from 'antd';
import UploadButton from './UploadButton';
import { Dragger, message } from 'antd';

describe('UploadButton component', () => {

    it('should render the upload page correctly', () => {

        const component = shallow(<UploadButton />);
        expect(component).toMatchSnapshot();
    });

});
