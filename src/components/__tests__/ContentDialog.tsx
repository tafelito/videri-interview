import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ContentDialog from 'components/ContentDialog';

describe('Content preview', () => {
  test('renders image content preview', async () => {
    const onClose = jest.fn();

    const imagePreview = {
      media: 'img' as const,
      title: 'flower-195893_150.jpg',
      src: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
    };
    const { getByAltText, getByLabelText } = render(
      <ContentDialog onClose={onClose} open={true} preview={imagePreview} />,
    );

    expect(getByAltText(/flower/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/close/i));

    expect(onClose).toHaveBeenCalled();
  });
});
