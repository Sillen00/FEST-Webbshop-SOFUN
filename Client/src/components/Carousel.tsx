import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

export default function ReactBootstrapCarousel() {
  const carouselWindow = {
    height: '500px',
  };

  const carouselImage = {
    objectFit: 'fill',
    // cover?
    height: '100%',
    width: '100%',
  };

  return (
    <>
      <Carousel>
        <Carousel.Item style={carouselWindow}>
          <img
            className='d-block w-100'
            src='/Images/Frame5.png'
            alt='soffa1'
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={carouselWindow}>
          <img
            className='d-block w-100'
            src='/Images/Frame6.png'
            alt='Second slide'
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={carouselWindow}>
          <img
            className='d-block w-100'
            src='/Images/Frame7.png'
            alt='Third slide'
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
