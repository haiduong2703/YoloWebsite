import React, { useState } from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";

import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
//import productData from "../assets/fake-data/products";

import banner from "../assets/images/banner.png";
import { getProductAPI } from "../api/product.js";
import { useEffect } from "react";
import { getProductNew } from "../api/api.js";

const Home = () => {
  const [listP, setListP] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var list = await getProductNew({});
    setListP(list);
  };
  console.log(listP);

  return (
    <Helmet title="Trang chủ">
      {/* hero slide */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={5000}
      />
      {/* end hero silde */}
      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link to="/policy" key={index}>
                <PolicyCard
                  key={index}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {listP.map((item, index) => (
              <ProductCard
                key={index}
                id={item.id}
                img01={item.namePath[0]}
                img02={item.namePath[1]}
                name={item.name}
                price={Number(item.price)}
                //slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner  */}

      <Section>
        <SectionTitle>Sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {listP.map((item, index) => (
              <ProductCard
                key={index}
                id={item.id}
                img01={item.namePath[0]}
                img02={item.namePath[1]}
                name={item.name}
                price={Number(item.price)}
                //slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Home;
