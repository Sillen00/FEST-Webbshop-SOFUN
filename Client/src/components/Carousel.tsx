import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

export default function ReactBootstrapCarousel() {
  return (
    <>
      <Carousel>
        {/* SLIDE 1 */}
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Images/Frame5.png'
            alt='soffa1'
            style={{ objectFit: 'cover', height: '500px', width: '100%' }}
          />
          <Carousel.Caption>
            <h3
              style={{
                textAlign: 'left',
                fontSize: '50px',
              }}
            >
              NYHETER
            </h3>
            <h3 style={{ textAlign: 'right', fontSize: '40px' }}>Upp till 30%</h3>
            <p style={{ textAlign: 'right' }}>På flera tre sits soffor</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Images/Frame6.png'
            alt='Second slide'
            style={{ objectFit: 'cover', height: '500px', width: '100%' }}
          />
          <Carousel.Caption style={{ textAlign: 'left' }}>
            <h3 style={{ textAlign: 'left' }}>TOBAGO</h3>
            <p style={{ textAlign: 'left' }}>Soffa Cinlay 3-sits i sammet</p>
            <p style={{ textAlign: 'left' }}>33,000 sek</p>
            <h3 style={{ textAlign: 'right', color: 'black' }}>CALLO</h3>
            <p
              style={{
                textAlign: 'right',
                fontSize: '25px',
                color: '#cc5158',
              }}
            >
              8,000 sek
            </p>
            <p style={{ textAlign: 'right', textDecoration: 'line-through', color: 'black' }}>
              11,000 sek
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 3 */}
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Images/Frame7.png'
            alt='Third slide'
            style={{ objectFit: 'cover', height: '500px', width: '100%' }}
          />

          <Carousel.Caption style={{ textAlign: 'left' }}>
            <h3 style={{ textAlign: 'left' }}>SHAPE i chenille</h3>
            <p style={{ textAlign: 'left' }}>30,000 sek</p>
            <h3 style={{ textAlign: 'right' }}>Skräddarsy din soffa</h3>
            <p style={{ textAlign: 'right', textDecoration: 'underline' }}>Shoppa nu</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
