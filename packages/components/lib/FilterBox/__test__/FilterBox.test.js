import React from 'react';
import { mount, render } from 'enzyme';
import { StoreContext } from '@css/redux';
import FilterBox from '../FilterBox';

const {Provider} = StoreContext;

describe(`#FilterBox`, () => {
  const dispatch = jest.fn();
  const state = {
    filter: [],
    view: ``,
  };

  afterEach(() => {
    dispatch.mockClear();
  });

  it(`renders`, () => {
    expect(
      render(
        <Provider value={{dispatch, state}}>
          <FilterBox />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  it(`dispatches upon selecting checkboxes`, () => {
    const wrapper = mount(
      <Provider value={{dispatch, state}}>
        <FilterBox />
      </Provider>
    );

    const created = wrapper.find(`input[name="created"]`);
    const cooked = wrapper.find(`input[name="cooked"]`);

    created.simulate(`change`);
    cooked.simulate(`change`);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].item).toBe(`created`);
    expect(dispatch.mock.calls[1][0].item).toBe(`cooked`);
  });
});
