/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { browserHistory } from 'react-router';

import { UnlockAccount } from '../UnlockAccount';

describe('UnlockAccount', () => {
  let props;
  let context;

  beforeEach(() => {
    spyOn(browserHistory, 'push');
    props = {
      unlockAccount: jest.fn().mockResolvedValue(),
      params: { username: 'username', code: 'code' },
    };

    context = { store: { getState: () => ({}) }, router: { location: '' } };
  });

  const renderComponent = () => shallow(<UnlockAccount {...props} />, { context });

  it('should call unlockAccount with params', done => {
    renderComponent();
    setTimeout(() => {
      expect(props.unlockAccount).toHaveBeenCalledWith(props.params);
      done();
    }, 0);
  });

  it('should redirect to login on success', done => {
    renderComponent();
    setTimeout(() => {
      expect(browserHistory.push).toHaveBeenCalledWith('/login');
      done();
    }, 0);
  });

  it('should redirect to login on failure', done => {
    props.resetPassword = jest.fn().mockRejectedValue('error');
    renderComponent();
    setTimeout(() => {
      expect(browserHistory.push).toHaveBeenCalledWith('/login');
      done();
    }, 0);
  });
});
