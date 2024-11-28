// import Slider from "react-slick";

import PricingPlan from "./PricingPlan";

function PricingPlans() {
  const pricingPlan = [
    {
      name: "Beginners",
      percentage: 5,
      duration: 20,
      minInvestment: 100,
      maxInvestment: 999,
    },
    {
      name: "Star",
      percentage: 10,
      duration: 24,
      minInvestment: 1000,
      maxInvestment: 4999,
    },
    {
      name: "Advance",
      percentage: 12,
      duration: 24,
      minInvestment: 5000,
      maxInvestment: 9999,
    },
    {
      name: "Business",
      percentage: 9,
      duration: 5,
      minInvestment: 3000,
      maxInvestment: 12000,
    },
    {
      name: "Golden",
      percentage: 10,
      duration: 78,
      minInvestment: 10000,
      maxInvestment: 20000,
    },
    {
      name: "Premium",
      percentage: 20,
      duration: 48,
      minInvestment: 20000,
      maxInvestment: "UNLIMITED",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="relative h-fit overflow-hidden">
      <div className="w-[800px] h-[1200px] -z-[0] absolute right-0 -top-[30rem] rounded-[4rem] rotate-[52deg] bg-[#051914]"></div>
      <div className="w-[850px] h-[1220px] -z-[0] absolute right-0 -top-[29.5rem] rounded-[4rem] rotate-[52deg] border-2 border-[#051914]"></div>
      <section className="w-11/12 xl:w-9/12 mx-auto my-32 z-10 relative">
        <h1 className="md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold font-main mb-3 text-center">
          Our <span className="text-[#00D094]">Pricing</span> Plans
        </h1>
        <p className="text-white font-sub lg:w-1/2 mx-auto md:w-3/4 md:text-md text-center">
          Here&apos;s our pricing plan: affordable, straightforward, and no
          hidden fees. That&apos;s it. Let&apos;s get started!
        </p>
        {/* <div className="z-50">
        </div> */}

        {/* <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider> */}

        <div className="flex flex-wrap justify-around gap-y-7 mt-14">
          {pricingPlan.map((plan) => (
            <PricingPlan plan={plan} key={plan.name} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default PricingPlans;
