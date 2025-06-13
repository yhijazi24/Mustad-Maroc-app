import "./css/brands.css"
import Navbar from '../components/Navbar'
import Maps from '../components/Maps'
import Footer from '../components/Footer'
import { useEffect } from "react"
import { useState } from "react"
import { publicRequest } from "../../requestMethods"


const Brands = () => {

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await publicRequest.get("/brands");
        setBrands(res.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='brands-list-container'>
        <div className='brands-list-wrapper'>
          <div className='brands-header'>
            <h1 className='brands-header-title'>Our Brands</h1>
          </div>

          <div className='brands-list-content'>
            {brands.map(item => (
              <div key={item.id} className='brand'>
                {item.website ? (
                  <a href={item.website} className='brands-content-link'>
                    <div className='brands-content'>
                      <div className='brands-content-img'>
                        <img className='content-img' src={item.img} alt='brand img' />
                      </div>
                      <div className='brands-list-info-card'>
                        <div className='brands-list-info'>
                          <h3 className='brands-list-title'>{item.title}</h3>
                          <p className='brands-list-desc'>
                            {item.desc.map((desc, index) => (
                              <span key={index}>
                                {desc}
                                {index < item.desc.length - 1 && " | "}
                              </span>
                            ))}
                          </p>
                        </div>
                        <p className='brand-website'>VISIT WEBSITE</p>
                      </div>

                    </div>
                  </a>

                ) : (

                  <div className='brands-content'>
                    <div className='brands-content-img'>
                      <img className='content-img' src={item.img} alt='brand img' />
                    </div>
                    <div className='brands-list-info-card'>
                      <div className='brands-list-info'>
                        <h3 className='brands-list-title'>{item.title}</h3>
                        <p className='brands-list-desc'>
                          {item.desc.map((desc, index) => (
                            <span key={index}>
                              {desc}
                              {index < item.desc.length - 1 && " | "}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Maps />
      <Footer />
    </div>
  )
}

export default Brands
