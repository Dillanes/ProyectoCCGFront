import React from 'react'
import Carousel from "react-elastic-carousel";
import Items from './Items';
import Img1 from '../assets/img/img1Slider.jfif'
import Img3 from '../assets/img/img3Slider.jfif'
import Img2 from '../assets/img/img2Slider.jfif'
import Img4 from '../assets/img/img4Slider.jfif'
import Img5 from '../assets/img/img5Slider.jfif'
import Img6 from '../assets/img/img6Slider.jfif'
import Img7 from '../assets/img/img7Slider.jfif'
import Img8 from '../assets/img/img8Slider.bmp'
import '../styles/slider.css'

function Slider() {
    

    const breakPoints = [
        { width: 1, itemsToShow: 5 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];

  return (
    <div>

      <div className="ContainerSliderHome">
        <Carousel breakPoints={breakPoints}>
          <Items><figure title='Administraión de obra' className="snip1477">
            <img className='imgSlider' src={Img1} alt="sample38" />
            <div className="title">
            <div>
            <h2 >Administración</h2>
            <h4>Ir</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img3} alt="sample38" />
            <div className="title">
            <div>
            <h2>Diseño</h2>
            <h4>Ir</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img4} alt="sample38" />
            <div className="title">
            <div>
            <h2>Penny</h2>
            <h4>Tool</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img5} alt="sample38" />
            <div className="title">
            <div>
            <h2>Planos</h2>
            <h4>Ir</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img6} alt="sample38" />
            <div className="title">
            <div>
            <h2>Costos</h2>
            <h4>Ir</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img2} alt="sample38" />
            <div className="title">
            <div>
            <h2>Seguridad</h2>
            <h4>ir</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
            <Items><figure className="snip1477">
            <img className='imgSlider' src={Img8} alt="sample38" />
            <div className="title">
            <div>
            <h2>Modelado 3D</h2>
            <h4>IR</h4>
            </div>
            </div>
            <figcaption>
            <p></p>
            </figcaption>
            <a href="#"></a>
            </figure></Items>
        </Carousel>
      </div>
    </div>
  )
}

export default Slider
