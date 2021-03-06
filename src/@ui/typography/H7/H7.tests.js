import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import H7 from './';

describe('the H7 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H7>Default H7 text</H7>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H7 style={salmon}>Salmon text</H7>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H7 accessible={false}>{'"We may speak about a place where there are no tears, no death, no fear, no night; but those are just the benefits of heaven. The beauty of heaven is seeing God." ― Max Lucado'}</H7>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
