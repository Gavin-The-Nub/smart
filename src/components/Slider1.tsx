import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Slider1 = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        navigation={{
          prevEl: ".custom_prev",
          nextEl: ".custom_next"
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination"
        }}
        className="mb-8"
      >
        <SwiperSlide>
          <div className="px-3 pb-5">
            <div className="card-slider group">
              <img
                className="rounded-xl w-full h-64 object-cover aspect-video"
                src="/vendor/monst/img/placeholders/img-2.jpg"
                alt="Monst"
              />
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="mt-5 text-xl font-semibold group-hover:text-blue-500">
                    <a href="#">User growth</a>
                  </h1>
                  <p className="mt-2 text-xs text-gray-500">Harvard university</p>
                </div>
                <div>
                  <a href="#" className="btn-outline hover-up-2 mr-2 text-xs">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="px-3 pb-5">
            <div className="card-slider group">
              <img
                className="rounded-xl w-full h-64 object-cover aspect-video"
                src="/vendor/monst/img/placeholders/img-3.jpg"
                alt="Monst"
              />
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="mt-5 text-xl font-semibold group-hover:text-blue-500">
                    <a href="#">Products</a>
                  </h1>
                  <p className="mt-2 text-xs text-gray-500">Cocacola., Co</p>
                </div>
                <div>
                  <a href="#" className="btn-outline hover-up-2 mr-2 text-xs">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="px-3 pb-5">
            <div className="card-slider group">
              <img
                className="rounded-xl w-full h-64 object-cover aspect-video"
                src="/vendor/monst/img/placeholders/img-4.jpg"
                alt="Monst"
              />
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="mt-5 text-xl font-semibold group-hover:text-blue-500">
                    <a href="#">Event</a>
                  </h1>
                  <p className="mt-2 text-xs text-gray-500">Oxford university</p>
                </div>
                <div>
                  <a href="#" className="btn-outline hover-up-2 mr-2 text-xs">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="px-3 pb-5">
            <div className="card-slider group">
              <img
                className="rounded-xl w-full h-64 object-cover aspect-video"
                src="/vendor/monst/img/placeholders/img-5.jpg"
                alt="Monst"
              />
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="mt-5 text-xl font-semibold group-hover:text-blue-500">
                    <a href="#">Shopping</a>
                  </h1>
                  <p className="mt-2 text-xs text-gray-500">Alibaba Co</p>
                </div>
                <div>
                  <a href="#" className="btn-outline hover-up-2 mr-2 text-xs">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex justify-between items-center mt-8">
        <div className="flex space-x-4">
          <span className="custom_prev">
            <ChevronLeft size={24} />
          </span>
          <span className="custom_next">
            <ChevronRight size={24} />
          </span>
        </div>
        <div className="custom-pagination"></div>
      </div>
    </>
  );
};