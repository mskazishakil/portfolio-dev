import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const ClientReviews = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])


  return (
    <div>
      <div className='text-center  mt-16'>
        <h1 className='text-3xl playfair lg:text-5xl font-bold  my-4'>Client Reviews</h1>
        <p className='text-gray-400 font-semibold urbanist'>I always focus on understanding client needs and turning their ideas into modern, visually appealing digital experiences. Satisfaction and quality are my top priorities. </p>
      </div>
       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       <div>
        
            {
              reviews.map(review =><SwiperSlide key={review._id}>
              
              <div  className='flex flex-col items-center  m-24 mt-10'>
                <img className='rounded-full w-16 ' src={review.profile_image} alt="" />
              <h1 className='text-2xl my-4 lg:text-4xl font-semibold'>{review.name}</h1>
              <p className='text-center text-sm lg:text-lg mb-4'>{review.clients_reviews}</p>
              <Rating style={{ maxWidth: 180, }} value={review.star_rating} readOnly />
              </div>

              </SwiperSlide>)
            }
       </div>
      </Swiper>
    </div>
  );
};

export default ClientReviews;