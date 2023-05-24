import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

export default function ReactBootstrapCarousel() {
  return (
    <>
      <Carousel>
        {/* SLIDE 1 */}
        <Carousel.Item>
          <img
            className='d-block'
            src='/Images/Carousel1.png'
            alt='soffa1'
            style={{ objectFit: 'cover', width: '100%', maxHeight: '600px' }}
          />
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <img
            className='d-block'
            src='/Images/Carousel2.png'
            alt='Second slide'
            style={{ objectFit: 'cover', width: '100%', maxHeight: '600px' }}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
