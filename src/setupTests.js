import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import sinon from 'sinon';




configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

global.localStorage = localStorageMock;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.expect = expect;
global.sinon = sinon;
