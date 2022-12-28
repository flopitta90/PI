import { render, screen } from '@testing-library/react';
import App from './App';
import { Error } from './components/Error';


test('Page 404', () => {
  render(<Error/>);
  const title = screen.getByText('404');
  expect(title).toBeInTheDocument();
});
 test('Image on 404', ()=>{
  render(<Error/>);
  const image = screen.getByAltText('gif')
  expect(image).toBeInTheDocument()
 })